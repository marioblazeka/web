// Tekst koji se vrti u kartici
        const scrollingText = "★ Mario Blažeka : Mario Blažeka osobna Web stranica, primjer sa raznim web alatima za edukaciju! Informativni sadržaj za kolegij Web aplikacije!!! ★ ";
        let position = 0;

        // Funkcija za ažuriranje naslova kartice
        function updateTabTitle() {
            // Pomakni poziciju
            position = (position + 1) % scrollingText.length;
            
            // Prikaži dio teksta koji "trči"
            const displayText = scrollingText.substring(position) + scrollingText.substring(0, position);
            
            // Postavi naslov kartice
            document.title = displayText.substring(0, 60); // Prikaži samo prvih 60 znakova
        }

        // Pokreni animaciju svakih 200ms (bržina trčanja)
        setInterval(updateTabTitle, 200);

        // Vrati originalni naslov kad korisnik vrati fokus na tab
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                // Tab je fokusiran - vrati originalni naslov
                document.title = "Mario Blažeka – Osobna web stranica | Web aplikacije";
                position = 0;
            } else {
                // Tab je u pozadini - nastavi sa trčećim tekstom
            }
        });

        // Kad se tab zatvori/otakne
        window.addEventListener('blur', function() {
            document.title = "Mario Blažeka – Vrati se! 👈";
        });

        window.addEventListener('focus', function() {
            document.title = "Mario Blažeka – Osobna web stranica | Web aplikacije";
            position = 0;
        });
