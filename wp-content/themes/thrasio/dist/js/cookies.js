const acceptPrivatBtn = document.getElementsByClassName("accept-privat-policy");
const cookiesBanner = document.getElementsByClassName("cookies-banner");

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if(cookiesBanner[0]) {
    document.addEventListener("DOMContentLoaded", () => {
        getCookie("accept-privacy") === "" ?
            setTimeout(() => cookiesBanner[0].classList.add("cookies-active"), 2000) : cookiesBanner[0].remove();
        ;
    });

    const closeToPrivarPolicy = (event) => {
        event.preventDefault();
        setCookie("accept-privacy", 1, 365);
        cookiesBanner[0].remove();
    };

    acceptPrivatBtn[0].addEventListener("click", closeToPrivarPolicy, false);
}
