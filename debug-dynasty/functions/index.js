const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.submitIssue = functions.https.onRequest(async (req, res) => {
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
            status: 'Open',
            timestamp: new Date().toISOString()
        };

        const docRef = await admin.firestore().collection('issues').add(issueData);
        return res.status(201).send({ id: docRef.id, ...issueData });

    } catch (error) {
        console.error('Error submitting issue:', error);
        return res.status(500).send('Internal Server Error');
    }
});
