const body = document.body

if(typeof(localStorage.Theme) != 'undefined'){
    if(localStorage.Theme === 'light'){
        body.classList.add('light')
        document.getElementById('theme-changer').children[0].classList.replace('fa-sun', 'fa-moon')
    }
}
else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    body.classList.add('light')
    document.getElementById('theme-changer').children[0].classList.replace('fa-sun', 'fa-moon')
    localStorage.setItem('Theme', 'light');
}

function changeTheme(button) {
    if (body.classList.contains('light')){
        document.getElementById('theme-changer').children[0].classList.replace('fa-moon', 'fa-sun')
        body.classList.remove('light')
        localStorage.setItem('Theme', 'dark')
        return
    }
    document.getElementById('theme-changer').children[0].classList.replace('fa-sun', 'fa-moon')
    body.classList.add('light');
    localStorage.setItem('Theme', 'light')
}