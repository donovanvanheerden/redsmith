const deps = ['chrome', 'node', 'electron'];

for(const dep of deps) {
    const element = document.getElementById(`${dep}-version`);

    if (element) {
        element.addEventListener('click', function() {
            alert(element.innerText)
        })
    }
}