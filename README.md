# REGOLE GENERALI DEL PROGETTO

## COMUNICAZIONE
*Tenere sempre aggiornati i membri del team sui propri sviluppi.*
Si può utilizzare il canale del team su discord(preferibile) o contattare Andrea che poi informerà il team(per urgenze se Andrea non è presente contattare Domenico)

## GIT
*TENERE SEMPRE AGGIORNATA LA REPOSITORY LOCALE*
Quando viene fatto un merge del main *bisogna sempre aggiornare il proprio main*.

1.Quando questo avviene passare al branch main del locale e fare un *git pull*
2.Passare al branch in cui si sta lavorando e fare un *git rebase main*
3.Risolvere i possibili conflitti generati, studiando bene il conflitto e risolvendolo di conseguenza, cercando di dare la priorità ai cambiamenti portati dal main(in quanto quello aggiorato alla repository e in condivisione).
4.Ora si può continuare a lavorare sul proprio branch.

*LAVORARE SEMPRE SU UN BRANCH DIVERSO DAL MAIN*
Il nome di questo branch deve richiamare la funzione che sta implementando.

I commit si fanno in inglese seguendo la seguente nomenclatura per una maggiore chiarezza:

*feat:*(feature) è un commit che aggiunge funzionalità al sito
*update:* implementata una miglioria ad un componente pre-esistente
*fix:* è un commit che va a correggere e sistemare parte di codice già implementato

Non si fa un merge del proprio lavoro nel main, si comunica la creazione della pull request e si aspetta che un membro del team la accetti.

Si lavora utilizzando le issue, ogni qual volta questa è stata completata inserire nella pull request *closes #(id dell'issue[apre il menù a tendina con il cancelletto])*

I branch mergiati vanno cancellati.

Se il nome di un branch non corrisponde alla feature che stiamo implementando non lo ricliamo, ne creiamo un altro e lavoriamo su quello.

## LINGUA DEL PROGETTO
Inglese (Commenti in italiano ammessi, ma ammessi anche in inglese)

## SUDDIVISIONE FILE:
Componenti nella cartella *components*
Custom Hooks nella cartella *custom-hooks*
Contesti nella cartella *contexts*
Immagini in *assets*

## NOMENCLATURA FILE, ELEMENTI E VARIABILI
codice html, css e nome immagini: *separare-le-parole-con-un-meno*
variabili javascript: lower camel case (esempio: *sonoUnEsempio*)
componenti: lower camel case con maiuscola iniziale (esempio: *SonoUnEsempio*)
custom hooks: lower camel case con prefisso use (esempio: *useSonoUnEsempio*)
contesti: lower camel case con prefisso Context (esempio: *ContextSonoUnEsempio*)

## STESURA CODICE CSS
L'ordine delle classi all'interno del file deve seguire l'ordine di apparizione delle classi sui relativi componenti per agevolare il loro browsing. 

Usare un modulo per quei componenti che si ripetono spesso e mantengono fisso il loro stile e layout.

Onde evitare problemi di nomenclatura creare una classe generica per la pagina in questione ed utilizzarla alla creazione delle classi per evitare bug e sovrapposizioni esempio:

*.pagina-di-login*

*.pagin-di-login .container*

## COMPONENTI
Firmare con un commento il componente così da poter risalire immediatamente al suo creatore.

Cercare di commentare il più possibile con informazioni legate ai vari passaggi logici il codice così da facilitare la letture di altri.

## INDENTARE
Indentare il codice in maniera uniforme seguendo le regole generale del best practice. Per favorire una lettura del codice cercare di separare i vari passaggi con una riga vuota.

## RESPONSIVE
Per la parte responsive del sito si inizia implementando la visione da cellulare, passando poi a tablet e infine a dekstop. I break point sono:

320 px - Dispositivi piccoli
768 px - Dispositivi Medi
1280 px - Dispositivi Grandi
1440 px - Dispositivi XL

Cerchiamo di utilizzare delle grandezze che si adattano alla responsive, farorire la % al pixel (*ma non per il gap di un flex e di una grid*). Sfruttare al meglio le funzionalità di flex e grid con le loro disposizioni e display.

Non abusare delle varie position, potrebbero creare comportamenti imprevisti, cercare sempre prima di trovare una soluzione tramite flex e grid. Ricordarsi che lo z-index in un position:relative genera uno z-index relativo, il che potrebbe complicare la gestione dello stile dell'elemento.

## LAVORO DI SQUADRA
Il lavoro di squadra è fondamentale. Se qualcuno riscontra dei problemi non deve farsi problemi a contattare un altro membro del team e chiedere aiuto.

*Il documentarsi rimane fondamentale*, se ci si trova davanti a un problema mai affrontato fin'ora fare ricerche su internet o chiedere informazioni sull'argomento a ChatGPT è fondamentale(*come è fontamentale utilizzare chatGPT in maniera costruttiva, senza copia e incolla, ma inquadrando il problema, capendolo e poi implementado la soluzione*).