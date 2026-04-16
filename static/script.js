let accounts = [];

document.getElementById('genBtn').addEventListener('click', async () => {
    const results = document.getElementById('results');
    const loading = document.getElementById('loading');
    const actions = document.getElementById('actionArea');
    
    loading.classList.remove('hidden');
    results.innerHTML = '';
    actions.classList.add('hidden');

    const prefix = document.getElementById('prefix').value;
    const region = document.getElementById('region').value;
    const count = document.getElementById('count').value;

    try {
        const res = await fetch(`/gen?name=${prefix}&region=${region}&count=${count}`);
        const data = await res.json();
        
        loading.classList.add('hidden');
        if(data.success && data.accounts.length > 0) {
            accounts = data.accounts;
            actions.classList.remove('hidden');
            data.accounts.forEach(acc => {
                results.innerHTML += `
                    <div class="result-box">
                        <b>UID|PASS:</b> ${acc.uid}|${acc.password} <br>
                        <b>TOKEN:</b> <small style="word-break:break-all">${acc.access_token}</small>
                    </div>`;
            });
        }
    } catch (e) { alert("Lỗi kết nối!"); loading.classList.add('hidden'); }
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const text = accounts.map(a => `UID: ${a.uid} | PASS: ${a.password} | TOKEN: ${a.access_token}`).join('\n');
    const blob = new Blob([text], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'accounts.txt';
    a.click();
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const text = accounts.map(a => `${a.uid}|${a.password}`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Đã copy UID|PASS");
});
