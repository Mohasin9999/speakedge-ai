const TestScore = require('../models/testScoreModel');
const path = require('path');
const { spawn } = require('child_process');

// This is the main analysis function
exports.analyzeAudio = async (req, res) => {
    try {
        const { topic, duration, userId } = req.body;
        const audioFile = req.file;
        if (!audioFile) { return res.status(400).send({ message: 'Audio file is required.' }); }

        const newTestScore = new TestScore({
            user: userId,
            topic: topic,
            duration: duration,
            status: 'processing',
        });
        await newTestScore.save();

        res.status(202).send({ message: 'Audio received and queued for analysis.', testScoreId: newTestScore._id });

        const pythonExecutablePath = "G:\\Code\\speakedge-ai\\server\\wisper\\venv\\Scripts\\python.exe";
        const scriptPath = path.join(__dirname, '..', 'wisper', 'main.py');
        const absoluteAudioPath = path.resolve(audioFile.path);
        
        const pythonProcess = spawn(pythonExecutablePath, [scriptPath, absoluteAudioPath]);

        pythonProcess.on('error', (err) => {
            console.error('Failed to start Python subprocess. Check hardcoded path.', err);
            TestScore.findByIdAndUpdate(newTestScore._id, { 
                status: 'failed',
                transcription: 'Configuration Error: Failed to start Python process.',
            }).catch(dbErr => console.error("DB update error after spawn fail:", dbErr));
        });

        let analysisResult = '';
        let analysisError = '';
        pythonProcess.stdout.on('data', (data) => { analysisResult += data.toString(); });
        pythonProcess.stderr.on('data', (data) => { console.error(`Python Script Error (stderr): ${data}`); analysisError += data.toString(); });

        pythonProcess.on('close', async (code) => {
            console.log(`Python script finished with exit code ${code}`);

            if (analysisResult) {
                try {
                    const results = JSON.parse(analysisResult);
                    if (results.error) {
                        console.error("A detailed error was reported by the Python script:");
                        console.error(results); // This will print the full JSON with traceback
                        await TestScore.findByIdAndUpdate(newTestScore._id, { 
                            status: 'failed', 
                            transcription: `Analysis failed: ${results.error_type} - ${results.error_message}` 
                        });
                    } else {
                        await TestScore.findByIdAndUpdate(newTestScore._id, {
                            status: 'processed',
                            transcription: results.transcription,
                            pronunciation: results.pronunciation_score,
                            fluency: results.fluency_score,
                            grammar: results.grammar_score,
                            vocabulary: results.vocabulary_score,
                        });
                        console.log(`Successfully updated test score ${newTestScore._id}`);
                    }
                } catch (e) {
                    console.error('Failed to parse Python script output as JSON. Raw output:', analysisResult);
                    await TestScore.findByIdAndUpdate(newTestScore._id, { status: 'failed', transcription: 'Invalid output from analysis script.' });
                }
            } else {
                console.error('Python script failed to execute properly and produced no output.');
                await TestScore.findByIdAndUpdate(newTestScore._id, { 
                    status: 'failed',
                    transcription: `Analysis failed with no output. Stderr: ${analysisError}`,
                });
            }
        });

    } catch (error) {
        console.error('Error in analyzeAudio controller:', error);
    }
};

// --- THIS FUNCTION WAS MISSING. IT IS NOW ADDED BACK. ---
// This function is used by the frontend to poll for results.
exports.getTestScore = async (req, res) => {
    try {
        const { id } = req.params;
        const testScore = await TestScore.findById(id);

        if (!testScore) {
            return res.status(404).send({ message: 'Test score not found.' });
        }

        res.status(200).send(testScore);
    } catch (error) {
        console.error('Error fetching test score:', error);
        res.status(500).send({ message: 'Server error.' });
    }
};