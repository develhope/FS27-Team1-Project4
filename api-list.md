# LISTA FETCH

## Custom Hooks per i fetch

Per fare i fetch si possono utilizzare due Custom Hook. Entrambi hanno impostato il percorso di default "http://localhost:3000/api/", come parametro entrambe accettano la parte finale del dominio del fetch:

1. useGetFetch(path)   [permette di recuperare i dati dal server]

  ritorna l'oggetto *{data, error, loading, onRefresh}*
                                    on Refresh permette di rifare il fetch dei dati quando necessario

2. useFetch(path, method) [permette di fare chiamate di rete scegliendo un metodo specifico]

  ritorna l'array *[onFetch, data, error, loading]*
          la funzione onFetch, se va a buon fine, ritorna i dati. A suo modo accetta i valori come parametro: onFetch(object, altPath, altMethod)

          1.object = il body della richiesta
          2.altPath = Path alternativo, se non specificato prenderà in    considerazione il parametro passato nel custom hook
          3.altMethod = Metodo alternativo, se non specificato prenderà in considerazione il parametro passato nel custom hook

## API e body

*Ricordare che i : all'interno del percorso indicano un parametro*

se la propretà del req.body è anticipata da un * significa che quella proprietà è richiesta.

### fetch legati agli user

[Recuperare] la lista [utenti]
path: *"users"*
method: *"GET"*
req.body: *""*

[Recuperare] un [utente]
path: *"user/id/:id"* -parametro: numero-
method: *"GET"*
req.body: *""*

[Recuperare] un [utente]
path: *"user/username/:username"* -parametro: stringa-
mathod: *"GET*
req.body: *""*

[Logout] [utente]
path: *"users/logout"*
mathod: *"GET"*
req.body: *""*

[Login] [Utente]
path: *"users/login"*
method: *"POST"*
req.body: {
  * username: stringa,
  * password: stringa
}

[SignUp] [Utente]
path: *"users/signup"*
method: *"POST"*
req.body: {
  * username: stringa,
  * password: stringa,
  * email: stringa,
  * firstname: stringa,
  * lastname: stringa,
  * country: stringa,
  * city: stringa,
  * address: stringa,
  * postalCode: stringa di numeri,
  phone: stringa,
  avatarUrl: stringa
}

[Aggiungi] [Domicilio]
path: *"users/address/add"*
method: *"POST"*
req.body: {
  * userId: numero,
  * country: stringa,
  * city: stringa,
  * address: stringa,
  * postalCode: stringa di numeri
}

[Aggiungi] [Carta di Credito]
path: *"users/cc/add"*
method: *"POST"*
req.body: {
  * userId: numero,
  * holder: stringa,
  * number: stringa di 16 numeri,
  * expire: stringa "numero numero / numero numero",
  * cvv: stringa di 3 numeri
}

[Modifica] [Utente]
path: *"user/update/:username"* -parametro: stringa-
method: *"PUT"*
req.body: {
  * username: stringa,
  * password: stringa,
  * email: stringa,
  * firstname: stringa,
  * lastname: stringa,
  * country: stringa,
  * address: stringa,
  * postalCode: stringa di numeri,
   phone: stringa,
   avatarUrl: stringa
}

[Cancella] [Utente] [Soft]
path: *"user/soft/:id"* -parametro: numero-
method: *"PATCH"*
req.body: *""*

[Cancella] [Utente] [Hard]
path: *"user/hard/:id"* -paramtero: numero-
method: *"DELETE"*
req.body: *""*

### fetch legati ai prodotti

[Recuperare] i prodotti [gears]
path: *"products/gears"*
method: *"GET"*
req.body: *""*

[Recuperare] un prodotto [gear]
path: *"products/gears/:series"* -parametro: stringa-
method: *"GET"*
req.body: *""*

[Recuperare] i prodotti [pc]
path: *"products/pc"*
method: *"GET"*
req.body: *""*

[Recuperare] un prodotto [pc]
path: *"products/pc/:name"* -parametro: stringa-
method: *"GET"*
req.body: *""*

[Aggiungere] un prodotto [gear]
path: *"products/gears/add"*
method: *"POST"*
req.body: {
  image: string,
  * type: string, Peripheral o Component
  * gear: string,
  * brand: string,
  * series: string,
  * features: array[string],
  * originalPrice: number,
  * discount: number,
  linkInfo: string,
  * stock: string
}

[Aggiungere] un prodotto [pc]
path: *"products/pc/add"*
method: *"POST"*
req.body: {
  * name: string,
  image: string,
  * description: string,
  * originalPrice: numero,
  discount: numero,
  * stock: numero
}

[Aggiornare] un prodotto [gear]
path: *"products/gears/update/:series"* -parametro: stringa -
method: *"PUT"*
req.body: {
   image: string,
  * type: string, Peripheral o Component
  * gear: string,
  * brand: string,
  * series: string,
  * features: array[string],
  * originalPrice: number,
  * discount: number,
  linkInfo: string,
  * stock: string
}

[Aggiornare] [stock] [gear]
path: *"products/gears/update/stock/:series"* - parametro: stringa -
method: *"PUT"*
{
  * stock: number
}

[Aggiornare] un prodotto [pc]
path: *"products/pc/update/:name"* -parametro: stringa-
method: *"PUT"*
req.body: {
  * name: string,
  image: string,
  * description: string,
  * originalPrice: numero,
  discount: numero,
  * stock: numero
}

[Aggiornare] [stock] [pc]
path: *"products/pc/update/stock/:name"* - parametro: stringa -
method: *"PUT"*
req.body: {
  * stock: number
}

[Cancellare] [Gear] [Soft]
path: *"products/gears/delete/:series"* - parametro: stringa -
method: *"PUT"*
req.body: *""*

[Cancellare] [Pc] [Soft]
path: *"products/pc/delete/:name"* - parametro: stringa -
method: *"PUT"*
req.body: *""*

### fetch legati ai brands

[Recuperare] tutti i [brand]
path: *"brands"*
method: *"GET"*
req.body: *""*

[Aggiungere] un [brand]
path: *"brands/add"*
method: *"POST"*
req.body: {
  * brand: stringa
}

[Modificare] un [brand]
path: *"brands/update/:id"* - parametro: numero -
method: *"PUT"*
req.body: {
  * brand: stringa
}

[Cancellare] un [brand]
path: *"brands/delete/:id"* - parametro: numero -
method: *"PUT"*
req.body: *""*

### fetch legati alle faqs

[Recuperare] le [faqs]
path: *"faqs"*
method: *"GET"*
req.body: *""*

[Creare] una [faq]
path: *"faqs/add"*
method: *"POST"*
req.body: {
  * question: stringa,
  * awnser: stringa
}

[Aggiornare] una [faq]
path: *"faqs/:id"* - parametro: numero -
method: *"PUT"*
req.body: {
  * question: stringa,
  * awnser: stringa
}

[Cancellare] una [faq] [soft]
path: *"faqs/delete/:id"* - parametro: numero -
method: *"PUT"*
req.body: *""*

### fetch legati ai ticket

[Recuperare] i [Tickets]
path: *"tickets"*
method: *"GET"*
req.body: *""*

[Recuperare] i [tickets] di uno [user]
path: *"tickets/user/:id"* - parametro: numero -
method: *"GET"*
req.body: *""*

[Recuperare] un [ticket] con  [id]
path: *"ticket/.id"* - parametro: numero -
method: *"GET"*
req.body: *""*

[Creare] un nuovo [ticket]
path: *"ticket/create"*
method: *"POST"*
req.body: {
  * openedBy: numero,
  * category: stringa, "build-your-pc" o "shipping" o "others"
  * ticketTitle: stringa
}

[Crea] un nuovo messaggio [chat]
path: *"ticket/add/:ticketId"* - parametro: numero -
method: *"POST"*
req.body: {
  * authorId: numero,
  image: stringa,
  * content: stringa, concesso ("")
}

[Modifica] un messaggio delle [chat]
path: *"ticket/update/:messageId"* - parametro: numero -
method: *"PUT"*
req.body: {
  * content: stringa, concesso ("")
}

[Cancella] un messaggio delle [chat]
path: *"ticket/delete/:messageId"* - parametro: numero -
method: *"PUT"*
req.body: *""*

[Chiudi] un [ticket]
path: *"ticket/close/:id"* - parametro: numero -
method: *"PUT"*
req.body: *""*

[Recupera] gli ultimi messaggi [letti]
path: *"last"*
method: *"GET"*
req.body: *""*

[Recupera] tutti gli ultimi messaggi [letti] di uno [user]
path: *"last/user/:id"* - parametro: numero -
method: *"GET"*
req.body: *""*

[Crea] l'ultimo messaggio [letto] di una [chat]
path: *"last/add"*
method: *"POST"*
req.body: {
  * userId: numero,
  * ticketId: numero
}

[Aggiorna] l'ultimo messaggio [letto] [dell'utente]
path: *"last/:ticketId"* - parametro: numero -
method: *"PUT"*
req.body {
  * userId: numero
}

### fetch legati all'aggiungere le immagini

Per il caricamento delle immagini c'è il custom Hook usePostImage.js

Questo hook ritorna un array [onFetch, error, loading]
                        onFetch serve per richiamare la funzione che farà il fetch


come parametro del custom hook passare la setter function della variabile di stato a cui associare l'immagine.

Quando si richiama la funzione onFetch passare come parametro l'event.target.files[0] dell'<input type="file">

