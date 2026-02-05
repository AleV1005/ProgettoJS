class CodiceFiscale {
    constructor(cognome, nome, anno, mese, sesso, giorno, comune) {
        this.codiceFiscale = "";
        this.cognome = cognome;
        this.nome = nome;
        this.anno = anno;
        this.mese = mese;
        this.sesso = sesso;
        this.giorno = giorno;
        this.comune = comune;
    }

    estraiCognome() {
        let senzaVocali = this.cognome.replace(/[aeiouAEIOU]/g, "");
        let senzaConsonanti = this.cognome.replace(/[^aeiouAEIOU]/g, "");
        let lsenzaVocali = senzaVocali.length;
        let lsenzaConsonanti = senzaConsonanti.length;
        let lcognome = this.cognome.length;

        if (lsenzaVocali == 3) {
            this.codiceFiscale += senzaVocali.substring(0, 3);
        }
        if (lsenzaVocali == 2) {
            this.codiceFiscale += senzaVocali.substring(0, 2);
            this.codiceFiscale += senzaConsonanti.substring(0);
        }
        if (lcognome == 2) {
            this.codiceFiscale += senzaVocali.substring(0);
            this.codiceFiscale += senzaConsonanti.substring(0);
            this.codiceFiscale += "x";
        }
        if (lsenzaConsonanti > 1 && lsenzaVocali < 1) {
            this.codiceFiscale += senzaConsonanti.substring(0, 2);
            this.codiceFiscale += "x";
        }
    }

    estraiNome() {
        let senzaVocali = this.nome.replace(/[aeiouAEIOU]/g, "");
        let senzaConsonanti = this.nome.replace(/[^aeiouAEIOU]/g, "");
        let lsenzaVocali = senzaVocali.length;
        let lnome = this.nome.length;

        if (lsenzaVocali <= 3) {
            this.codiceFiscale += senzaVocali.substring(0, 3);
            if (lsenzaVocali <= 0) {
                this.codiceFiscale += senzaConsonanti.substring(0, 3);
            }
        }
        if (lsenzaVocali >= 4) {
            this.codiceFiscale += senzaVocali.charAt(0);
            this.codiceFiscale += senzaVocali.charAt(2);
            this.codiceFiscale += senzaVocali.charAt(3);
        }
        if (lnome <= 2) {
            this.codiceFiscale += senzaVocali.substring(0, 2);
            this.codiceFiscale += "x";
        }
    }

    estraiAnnoNascita() {
        this.codiceFiscale += this.anno.substring(2, 4);
    }

    estraiMeseNascita() {
        switch (this.mese) {
            case "gennaio": this.codiceFiscale += "a"; break;
            case "febbraio": this.codiceFiscale += "b"; break;
            case "marzo": this.codiceFiscale += "c"; break;
            case "aprile": this.codiceFiscale += "d"; break;
            case "maggio": this.codiceFiscale += "e"; break;
            case "giugno": this.codiceFiscale += "h"; break;
            case "luglio": this.codiceFiscale += "l"; break;
            case "agosto": this.codiceFiscale += "m"; break;
            case "settembre": this.codiceFiscale += "p"; break;
            case "ottobre": this.codiceFiscale += "r"; break;
            case "novembre": this.codiceFiscale += "s"; break;
            case "dicembre": this.codiceFiscale += "t"; break;
        }
    }

    estraiGiorno() {
        if (this.sesso == "uomo") {
            this.codiceFiscale += String(this.giorno);
        }
        if (this.sesso == "donna") {
            this.codiceFiscale += String(this.giorno + 40);
        }
    }

    estraiComune() {
        let codiceComune = "";
        switch (this.comune) {
            case "aprilia": codiceComune = "a341"; break;
            case "genzano": codiceComune = "d972"; break;
            case "velletri": codiceComune = "l719"; break;
            case "latina": codiceComune = "e472"; break;
            case "cisterna": codiceComune = "c740"; break;
            case "lariano": codiceComune = "m207"; break;
            case "artena": codiceComune = "a446"; break;
            case "albano": codiceComune = "a132"; break;
            default: codiceComune = "XXX"; break;
        }
        this.codiceFiscale += codiceComune;
    }

calcolaCarattereControllo() {

    // sicurezza: deve avere 15 caratteri prima del controllo
    if (this.codiceFiscale.length !== 15) return;

    const dispari = {
        '0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,'9':21,
        'A':1,'B':0,'C':5,'D':7,'E':9,'F':13,'G':15,'H':17,'I':19,'J':21,
        'K':2,'L':4,'M':18,'N':20,'O':11,'P':3,'Q':6,'R':8,'S':12,'T':14,
        'U':16,'V':10,'W':22,'X':25,'Y':24,'Z':23
    };

    const pari = {
        '0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,
        'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,
        'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,
        'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25
    };

    let somma = 0;

    for (let i = 0; i < 15; i++) {

        let c = this.codiceFiscale[i];

        if (!c) continue;   // ⭐ evita crash

        c = c.toUpperCase();

        if ((i + 1) % 2 === 0) {
            somma += pari[c] ?? 0;
        } else {
            somma += dispari[c] ?? 0;
        }
    }

    const lettere = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.codiceFiscale += lettere[somma % 26];
}

    stampaCodice() {
        this.estraiCognome();
        this.estraiNome();
        this.estraiAnnoNascita();
        this.estraiMeseNascita();
        this.estraiGiorno();
        this.estraiComune();
        this.calcolaCarattereControllo();
        return this.codiceFiscale;
    }

}

function generaCF() {
    const cognome = document.getElementById("cognome").value;
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const comune = document.getElementById("comune").value;
    const sesso = document.getElementById("sesso").value;

    if (!data) {
        alert("Inserisci una data valida");
        return;
    }

    const anno = data.substring(0, 4);
    const meseNumero = parseInt(data.substring(5, 7));
    const giorno = parseInt(data.substring(8, 10));

    const mesi = [
        "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
        "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
    ];

    const mese = mesi[meseNumero - 1];

    const cf = new CodiceFiscale(cognome, nome, anno, mese, sesso, giorno, comune);

    const risultato = cf.stampaCodice();

    document.querySelector("input[readonly]").value = risultato;
}

const btn = document.getElementById("themeToggle");

btn.onclick = function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "â˜€ï¸ Light Mode";
    } else {
        btn.textContent = "🌙Dark Mode";
    }
};
