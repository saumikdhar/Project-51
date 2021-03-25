const StructurizrClient = require('structurizr-typescript').StructurizrClient;

module.exports = pushWorkspace = workspace => {
    const WORKSPACE_ID = 64515;
    const API_KEY = '9d11012d-af1e-4ae1-bbc1-191845eab5ea';
    const API_SECRET = 'c64e8864-c419-4df7-b275-d8c27aba1fb9';

    const client = new StructurizrClient(API_KEY, API_SECRET);

    return client.putWorkspace(WORKSPACE_ID, workspace);
};
