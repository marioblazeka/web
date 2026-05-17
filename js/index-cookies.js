document.addEventListener("DOMContentLoaded", function () {
            var banner = document.getElementById('cookie-banner');
            var acceptBtn = document.getElementById('accept-cookies');
            var rejectBtn = document.getElementById('reject-cookies');
            
            if (!localStorage.getItem('cookiesAccepted')) {
                banner.style.display = 'flex';
            } else {
                banner.style.display = 'none';
            }
            
            acceptBtn.onclick = function(){
                localStorage.setItem('cookiesAccepted', '1');
                banner.style.display = 'none';
            };
            
            rejectBtn.onclick = function(){
                localStorage.setItem('cookiesAccepted', '0');
                banner.style.display = 'none';
            };
        });

        var backToTop = document.getElementById("backToTop");
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
