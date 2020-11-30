'use strict';

function onInit() {
    createProjects();
    renderProjects();
    console.log('Let\'s Go');
}

function changeColor() {
    var theme = document.querySelector("#theme-link");
    if (theme.getAttribute('href') === 'css/ca-gallery.css') {
        theme.href = 'css/ca-gallery-dark.css'
    } else {
        theme.href = 'css/ca-gallery.css';
    }
}

function onToggleColor(ev) {
    ev.stopPropagation();
    changeColor();
}

function showFormError(errorType) {
    var elError = document.querySelector('.form-error')
    if (errorType === 'mail') {
        elError.innerText = 'Please enter valid email.'
    } else {
        elError.innerText = 'Can\'t send empty message';
    }
}


function onSendForm() {
    var elMailTxt = document.querySelector('input[name="email"]')
    var elSubjectTxt = document.querySelector('input[name="subject"]')
    var elMsg = document.querySelector('textarea[name="txt"]')
    var elError = document.querySelector('.form-error')
    var validMailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validMailRegEx.test(elMailTxt.value)) return showFormError('mail')
    else if (!elMsg.value) return showFormError('msg');
    else {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=yonisegev6@gmail.com&su=${elSubjectTxt.value}&body=${elMsg.value}`, '_blank')

        elMailTxt.value = '';
        elSubjectTxt.value = '';
        elMsg.value = '';
        elError.innerText = '';
        openCanvas();
    }

}
function renderProjects() {
    var projs = getProjsForDisplay();
    var strHTML = projs.map(function (project) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onModalClick('${project.id}')">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="./img/portfolio/${project.id}-thumbnail.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4 class="project-name">${project.name}</h4>
            <p class="text-muted">${project.title}</p>
            <span class="badge badge-success">${project.labels[0]}</span>
            <span class="badge badge-success">${project.labels[1]}</span>
            <span class="badge badge-success">${project.labels[2]}</span>
          </div>
        </div>
        `
    })
    document.querySelector('.projs-container').innerHTML = strHTML.join('');
}

function updateModal(project) {
    var modal = document.querySelector('.modal-body')
    var strHTML = `
    <h2 class="modal-proj-name">${project.name}</h2>
    <p class="item-intro text-muted modal-title">${project.title}</p>
    <img class="img-fluid d-block mx-auto modal-proj-img" src="img/portfolio/${project.id}-full.jpg" alt="">
    <p class="modal-desc">${project.desc}</p>
    <button class="btn btn-demo" type="button">
    <a href="./projects/${project.id}/index.html" target="_blank"><i class="fa fa-eye"></i>
        Check Demo</a></button>
    <button class="btn btn-danger btn-red" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
        Close Project</button>
    `
    modal.innerHTML = strHTML;
}

function onModalClick(id) {
    var project = getProject(id)
    updateModal(project);
}