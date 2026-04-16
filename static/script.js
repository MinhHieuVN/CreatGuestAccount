let savedAccounts = [];

document.getElementById('genBtn').addEventListener('click', async () => {
    const name = document.getElementById('namePrefix').value;
    const region = document.getElementById('region').value;
    const count = document.getElementById('count').value;
    
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const actions = document.getElementById('actionButtons');

    resultArea.innerHTML = '';
    loading.classList.remove('hidden');
    actions.classList.add('hidden');

    try {
        const res = await fetch(`/gen?name=${name}&region=${region}&count=${count}`);
        const data = await res.json();
        
        loading.classList.add('hidden');
        if(data.success) {
            savedAccounts = data.accounts;
            actions.classList.remove('hidden');
            
            data.accounts.forEach(acc => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <div><span class="label">UID:</span>${acc.uid}</div>
                    <div><span class="label">PASS:</span>${acc.password}</div>
                    <div><span class="label">TÊN:</span>${acc.name}</div>
                `;
                resultArea.appendChild(card);
            });
        }
    } catch (e) {
        alert("Lỗi kết nối API!");
        loading.classList.add('hidden');
    }
});

document.getElementById('exportBtn').addEventListener('click', () => {
    let txt = "DANH SÁCH TÀI KHOẢN\n" + "=".repeat(20) + "\n";
    savedAccounts.forEach(a => txt += `UID: ${a.uid} | PASS: ${a.password} | TÊN: ${a.name}\n`);
    const blob = new Blob([txt], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts_${Date.now()}.txt`;
    a.click();
});

document.getElementById('copyAllBtn').addEventListener('click', () => {
    const text = savedAccounts.map(a => `${a.uid}|${a.password}`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Đã copy định dạng UID|PASS");
});
