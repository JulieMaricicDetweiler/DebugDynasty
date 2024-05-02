const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true}); // Automatically allows cross-origin requests


admin.initializeApp();

exports.submitIssue = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        try {
            const { title, description, reporter, severity, projectToken } = req.body;

            // Validate the input including projectToken
            if (!title || !description || !reporter || !severity || !projectToken) {
                return res.status(400).send('Missing required fields');
            }

            // Check if the project exists by trying to retrieve it using the projectToken
            const projectRef = admin.firestore().collection('projects').doc(projectToken);
            const projectDoc = await projectRef.get();
            if (!projectDoc.exists) {
                return res.status(404).send('Project not found');
            }

            const issueData = {
                title,
                description,
                reporter,
                severity,
                status: 'Open',
                timestamp: new Date().toISOString(),
                fromUser: true
            };

            // Write the issue to the specific project's 'submittedIssues' subcollection
            const docRef = await projectRef.collection('submittedIssues').add(issueData);
            return res.status(201).send({ id: docRef.id, ...issueData });

        } catch (error) {
            console.error('Error submitting issue:', error);
            return res.status(500).send('Internal Server Error');
        }
    });
});
