const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPIs() {
    console.log('--- TESTING APIs (Including Auth Flow) ---');

    let userId = null;

    // 1. Test Auth (Mock Login) - Vital for the new Frontend logic
    try {
        console.log('\n1. Testing POST /api/auth/mock-login...');
        const authRes = await axios.post(`${API_URL}/auth/mock-login`, { username: 'demoUser' });
        if (authRes.data.user && authRes.data.user._id) {
            userId = authRes.data.user._id;
            console.log('✅ Auth Success. User ID:', userId);
            console.log('   User Tier:', authRes.data.user.tier);
        } else {
            throw new Error('User ID not returned in auth response');
        }
    } catch (err) {
        console.error('❌ Auth Failed:', err.message);
        return; // Cannot proceed without ID
    }

    // 2. Test QOTD Fetch
    try {
        console.log('\n2. Testing GET /api/qotd...');
        const qotdRes = await axios.get(`${API_URL}/qotd`);
        console.log('✅ QOTD Fetch Success:', qotdRes.status);
        console.log('   Question:', qotdRes.data.title);
    } catch (err) {
        console.error('❌ QOTD Fetch Failed:', err.message);
    }

    // 3. Test Run Code (Mock Execution) using Dynamic ID
    try {
        console.log('\n3. Testing POST /api/run (Mock Execution)...');
        const runRes = await axios.post(
            `${API_URL}/run`,
            { language: 'javascript', code: 'console.log("test")' },
            { headers: { 'x-user-id': userId } }
        );
        console.log('✅ Run Code Success:', runRes.status);
        console.log('   Result:', runRes.data);
    } catch (err) {
        console.error('❌ Run Code Failed:', err.response ? err.response.data : err.message);
    }

    // 4. Test Rate Limiting (Run 5 times)
    console.log('\n4. Testing Rate Limiting (5 rapid requests)...');

    for (let i = 1; i <= 5; i++) {
        try {
            await axios.post(
                `${API_URL}/run`,
                { language: 'javascript', code: `console.log(${i})` },
                { headers: { 'x-user-id': userId } }
            );
            console.log(`   Request ${i}: Allowed`);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                console.log(`   Request ${i}: 🛑 Blocked (Rate Limit Working)`);
            } else {
                console.log(`   Request ${i}: Failed (${err.message})`);
            }
        }
    }

    // 5. Test Leaderboard
    try {
        console.log('\n5. Testing GET /api/leaderboard?difficulty=Easy...');
        const lbRes = await axios.get(`${API_URL}/leaderboard?difficulty=Easy`);
        console.log('✅ Leaderboard Fetch Success:', lbRes.status);
        console.log('   Data Length:', lbRes.data.length);
    } catch (err) {
        console.error('❌ Leaderboard Fetch Failed:', err.message);
    }
}

testAPIs();
