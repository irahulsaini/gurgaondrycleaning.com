
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // offset for fixed nav
        if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
            scrollIntoViewIfNeeded(link); 
        }
    });
});

//alphabets
document.querySelectorAll('.input-text').forEach(function(element){
    element.addEventListener('input',function(){
        this.value = this.value.replace(/[^A-Z a-z]/g,'').trimStart();
    });
});
//numbers
document.querySelectorAll('.input-number').forEach(function(element){
    element.addEventListener('input',function(){
        this.value = this.value.replace(/[^0-9]/g,'').trimStart();
    });
});
//email
document.querySelectorAll('.input-email').forEach(function(element){
    element.addEventListener('input',function(){
        var value = this.value.replace(/\.\./g, ".");
        //remove .@
        value = value.replace(/\.@/g,"@");
        //remove extra chars
        value = value.replace(/[^A-Z a-z0-9.@_-]/g,'');
        //multiple @
        value = value.replace(/\@@/g,"@");
        
        //remove whitespace from start
        this.value = value.trimStart();
    });
    //remove . from the end
    element.addEventListener('change',function(){
        value = this.value;
        if( value[value.length-1] == '.'){
            value = value.substring(0,value.length-1)
        }        
        //remove whitespace from start
        this.value = value.trimStart()
    });
});

document.querySelectorAll('.contactForm').forEach(function(form){
    form.addEventListener('submit',function(e){
        e.preventDefault();
        var name = e.target.name;
        var phone = e.target.phone;
        var service = e.target.service;
        var message = e.target.message;
        var submit = form.querySelector('[type="submit"]');
        var response = form.querySelector('.response');
        response.innerHTML = '';
        submit.setAttribute('disabled',1);
        if(!name.value){
            response.innerHTML = `<div class="alert alert-danger alert-sm small">Please enter a valid name.</div>`;
            submit.removeAttribute('disabled');
            return false;
        }
        if(!phone.value){
            response.innerHTML = `<div class="alert alert-danger alert-sm small">Please enter a valid phone.</div>`;
            submit.removeAttribute('disabled');
            return false;
        }
        if(!service.value){
            response.innerHTML = `<div class="alert alert-danger alert-sm small">Please select a service.</div>`;
            submit.removeAttribute('disabled');
            return false;
        }
        const formData = new FormData(this);
        
        fetch("./mail.php", {
            method: "POST",
            body: formData,
        }).then((response) => response.json()).then((response) => {
            submit.removeAttribute('disabled');
            console.log(response);
        });
        
    })
})


function scrollIntoViewIfNeeded(el) {
  const parent = el.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  if (elRect.left < parentRect.left || elRect.right > parentRect.right) {
    el.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
}
AOS.init({
    duration: 1000
});

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
})