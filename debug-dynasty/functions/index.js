const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true}); // Automatically allows cross-origin requests

admin.initializeApp();

exports.submitIssue = functions.https.onRequest((req, res) => {
    cors(req, res, () => { // Wrap your existing handler with cors
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { title, description, reporter, severity } = req.body;
            // Validate the input
            if (!title || !description || !reporter || !severity) {
                return res.status(400).send('Missing required fields');
            }

            const issueData = {
                title,
                description,
                reporter,
                severity,
                status: 'open',
                timestamp: new Date().toISOString()
            };

            admin.firestore().collection('issues').add(issueData)
                .then(docRef => res.status(201).send({ id: docRef.id, ...issueData }))
                .catch(error => {
                    console.error('Error submitting issue:', error);
                    res.status(500).send('Internal Server Error');
                });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});
