# Exatel - BuggatiBoy$

## Wstęp:
- krotki wstep kim jestesmy, jaka byla nasza motywacja.

## Historycznie
- parametryzacja plikow `TF`/`DF` (normalizacja częstotliwości)
- `bag_of_words`

## Metoda klasteryzacji:
- `clustering hierarchiczny`
- `clustering korelacyjny`
- `kamean clustering`

Nasze rozwiazanie: `kamean clustering`:
- łatwość implementacji
- dobre wyniki

>`kamean` musi mieć na stałe zdefiniowaną liczbę klastrów na stałe.

> 1metoda średniej sylwetki1 (oznacza jak dobrze obiekt lezy wewnatrz klastra)

## Skrypt uruchomieniowy

```
python run.py
```

## Test
Porownywanie artykułów na wikipedii z rapowymi tekstami.

## Looking forward

Przetestowac wplyw redukcji wymiarow na skutecznosc. Można ją zrobic metoda lingwistyczna albo metodą losowych rzutów.

Można zastosować inne metody klasteryzacji.

**BugattiBoy$**
