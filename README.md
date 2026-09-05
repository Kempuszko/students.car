#  Students.Car — Platforma Rezerwacji Pojazdów

Fullstackowa aplikacja internetowa dedykowana wypożyczalni samochodów, stworzona przy użyciu **Next.js** oraz bazy danych **MySQL**.

##  Kluczowe Funkcjonalności

* **Strona Główna i Flota:** Sekcja TOP 3 najczęściej wybieranych modeli, galeria pojazdów oraz moduł FAQ.
* **System Rezerwacji:** 
  * Wybór zakresem dat za pomocą komponentu `React Day Picker`.
  * Walidacja formularza i zapis danych rezerwacji bezpośrednio w bazie MySQL.
  * Przechowywanie ID rezerwacji w cookies urządzenia dla łatwego dostępu klienta bez konieczności zakładania konta.
* **Panel Administratora (Protected Route):**
  * Dostęp pod ukrytym routem zabezpieczonym sprawdzaniem sesji w bazie danych.
  * Bezpieczna autoryzacja z szyfrowaniem haseł.
  * Pełne zarządzanie (CRUD) listą aut oraz aktualnymi rezerwacjami.

##  Stack Technologiczny

* **Frontend:** Next.js (App Router), React, Tailwind CSS, React Day Picker
* **Backend:** Next.js Server Actions / API Routes
* **Baza danych:** MySQL
* **Bezpieczeństwo:** Cookies, Szyfrowanie haseł (crypto), Autoryzacja sesyjna
