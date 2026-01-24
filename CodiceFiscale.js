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
            default: codiceComune = "XXX"; break;
        }
        this.codiceFiscale += codiceComune;
    }

    stampaCodice() {
        this.estraiCognome();
        this.estraiNome();
        this.estraiAnnoNascita();
        this.estraiMeseNascita();
        this.estraiGiorno();
        this.estraiComune();
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
