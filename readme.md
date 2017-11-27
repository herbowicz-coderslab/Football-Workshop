# Warsztaty

### Przygotowanie

> Stwórz w pełni działające środowiko, które pozwoli Ci pisać pliki JSX, skompilować je do plików JS i uruchomić działającą aplikację React.
> 
> Pamiętaj o:
> - ```npm init```
> - Zainstalowaniu odpowiednich modułów
> - Ustawieniu Webpacka, plikiem wejściowym ma być `js/app.jsx`, wyjściowym `js/out.js`

## Piłkarska baza danych

Twoje zadanie będzie polegało na stworzeniu piłkarskiej bazy danych. Wyświetlane będą informacje o zawodach, z których będzie można wyświetlić drużyny, a z nich - zawodników.

## Klucz API

Korzystamy z prawdziwych danych znajdujących się w zewnętrznym API. Aby móc z niego korzystać potrzebujesz darmowego klucza API. Otrzymasz go w kilka minut na e-mail, po uzupełnieniu formularza dostępnego na:

<http://api.football-data.org/register>

Po chwili otrzymasz e-mail z informacją:

> ...
>
> Your API token: 5819e79e...........................546
>
> ...

Zapisz ten klucz.

## Cache Proxy

Dostęp do serwera jest ograniczony i nie możemy wykonywać na nim zbyt wiele zapytań. Jest to realny scenariusz. Dlatego skorzystamy ze specjalnej klasy, która będzie pośredniczyła i zapamiętywała dane, o które już pytaliśmy.

Znajdziesz ją w pliku `js/cacheProxy.js`.

Na początku musisz odpowiednio przygotować klasę. Znajduje się w niej metoda `_fetchData()`, którą masz przygotować w taki sposób, żeby za pomocą `fetch()` pobierała dane z adresu podanego w argumencie `url`.

Koniecznie **dodaj do ustawień zapytania odpowiedni nagłówek, w ten sposób:**
```JavaScript
{
    headers:{
        'X-Auth-Token':'Twój klucz API'
    }
}
```

Pamiętaj, że dane przychodzą w formacie JSON, trzeba je zdekodować.

Zwracaj również Promise.

### Użycie

Aby skorzystać z Cache Proxy wystarczy, że zaimportujesz gotowy obiekt najpierw w pliku np. przez:
```JavaScript
import cacheProxy from './cacheProxy';
```

Następnie, aby wykonać zapytanie do dowolnego zasobu (np. "http://example.com") skorzystaj z metody `get()` zaimportowanego obiektu:
```JavaScript
cacheProxy.get('http://example.com');
```

Metoda ta **zawsze zwraca Promise, który spełnia się do gotowych danych.**

Przykład:
```JavaScript
cacheProxy.get('http://example.com/getJson...').then( dataObj => console.log( dataObj ) );
```

## Uwagi ogólne

1. Na początku przemyśl architekturę swojej aplikacji! Dopiero potem weź się za pisanie kodu. Sprawdzaj każdy moduł.
2. Pamiętaj o blokowaniu wyświetlania lub zwracaniu informacji o ładowaniu w każdym komponencie, w którym wykonujesz zapytanie o dane.
3. Jeżeli brakuje jakiś danych, sprawdź na innych zawodach/drużynach/zawodnikach! API nie jest kompletne (m.in. dane o zawodnikach są tylko dla najpopularniejszych drużyn).
4. Postaraj się podzielić Twój kod na pliki. Postaraj się elementy powtarzające zawierać we wspólnych komponentach, dzięki kompozycji.

## Wygląd aplikacji

Aplikacja jest podzielona na dwa okienka. Po lewej stronie na szerokość ok. 300 px i na wysokość całego ekranu znajduje się **lista zawodów**.

Całą reszta ekranu to treść aplikacji - różna w zależności od wyboru na późniejszych ekranach. Na początku moze tam się znajdować informacja, żeby wybrać jedne zawody.

## Zawody

Aby pobrać listę zawodów wykonaj zapytanie na adres API:

> <http://api.football-data.org/v1/competitions>

Otrzymasz tablicę wszystkich zawódów dla których są informacje.

Każdy element składa się z obiektu.

Dla listy będą Ci potrzebne dane spod kluczy `id` oraz `caption`.

Po wybraniu zawodów ekran treści dzieli się ponownie na 2 ekrany: po lewej podobnie do zawodów pojawia się **lista drużyn**. Po prawej pojawiają się informacje o danych zawodach, spod kluczy `caption`, `league`, `year`, `numberOfTeams`, `numberOfGames`.

## Drużyny

Aby pobrać listę drużyn dla danych zawodów wykonaj zapytanie na adres API, który znajdziesz w obiekcie konkretnego zawodu pod kluczem `_links.teams.href`.

Otrzymasz obiekt, w którym interesuje Cię tablica pod kluczem `teams`.

Dla listy będą Ci potrzebne dane spod klucza `name` (nie ma tutaj ID - pomyśl jaka dana jest tutaj unikalna (odnośnik)).

Po wybraniu drużyny ekran treści dzieli się ponownie na 2 ekrany: po lewej podobnie do zawodów pojawia się **lista zawodników** (uwaga: dla wielu klubów brakuje tej informacji!). Po prawej pojawiają się informacje o danej drużynie, spod kluczy `name`, `code`, `shortName`, `squadMarketValue`, `crestUrl` (to wyświetl w elemencie `img`).

## Zawodnicy

Aby pobrać listę zawodników dla danej drużyny wykonaj zapytanie na adres API, który znajdziesz w obiekcie konkretnej drużyny pod kluczem `_links.players.href`.

Otrzymasz obiekt, w którym interesuje Cię tablica pod kluczem `players`.

Dla listy będą Ci potrzebne dane spod klucza `name` (nie ma tutaj ID - pomyśl jaka dana jest tutaj unikalna (być może zostaje Ci tu indeks lub nazwisko?)).

Po wybraniu zawodnika na ekranie treści pojawiają się informacje o danym zawodniku, spod kluczy `name`, `position`, `dateOfBirth`, `nationality`, `contractUntil` (o ile dostępne, sprawdź czy nie `null`), `marketValue` (o ile dostępne, sprawdź czy nie `null`).

## Routing

Stwórz odpowiedni routing, tak, żeby **każda z informacji** była pod odpowiednią ścieżką, np:
- `/` - strona główna;
- `/competition/:id` - informacje o danych zawodach i lista drużyn;
- `/team/:competitionId/:teamIndex` - informacje o danej drużynie i lista zawodników;
- `/player/:teamId/:playerIndex` - informacje o danym zawodniku.

Zastanów się jak rozwiązać problem tego, że nie wszędzie są dostępne wszystkie ID (propozycja znajduje się w wyżej podanych ścieżkach).

Pamiętaj, żeby w przypadku zawodów lista po lewej podświetlała w widoczny sposób aktualnie wybrany link.

## * Dla ambintych :) Wyszukiwarka

Jeżeli chcesz to dla każdej z list dodaj kontrolowany element formularza `input type="text"`. Podczas wpisywania (zrób to w event handlerze `onChange`) zastosuj takie reguły dla danej listy:
- Jeżeli nic nie ma w `input` to wyświetlaj wszystko;
- Jeżeli cokolwiek jest wpisane w `input` to przefiltruj wyświetlane elementy tak, żeby pojawiały się tylko te które zawierają wpisany tekst.


**Powodzenia :)**