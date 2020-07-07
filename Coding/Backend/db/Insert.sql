INSERT INTO Film (Titel,Beschreibung,Genre,Trailer,FSK,Dauer,Coverpfad,Videopfad) VALUES ('Ruf der Wildnis','dd','Drama','https://www.youtube.com/embed/n-MB85CBVv4',12,100,' ','');
INSERT INTO Film (Titel,Beschreibung,Genre,Trailer,FSK,Dauer,Coverpfad,Videopfad) VALUES ('Inception','dd','Science-Fiction','https://www.youtube.com/embed/JEv8W3pWqH0',16,148,' ','');


INSERT INTO Vorstellung (FilmID,Datum) VALUES (1,'2020-05-31T20:15');

INSERT INTO Ticket (VorstellungsID,Code,BenutzerId,Preis) VALUES (1,'Ticket-Code-1',1,12);

INSERT INTO SnackTyp VALUES (2,'Nachos', 8.50, 'TExt', '');
INSERT INTO SnackTyp VALUES (1,'Popcorn', 10.50, 'TExt', '');

INSERT INTO Snack Values (1,1,1,2,0);
INSERT INTO Snack Values (2,2,1,5,0);

INSERT INTO Benutzer VALUES (1,'Lustig','Peter','Peter@gmx.de','PayPal',123,133,1);
INSERT INTO Benutzer VALUES (2,'Lustig','Markus','Markus@gmx.de','PayPal',123,133,2);

INSERT INTO Chat VALUES (1,1);
INSERT INTO ChatNachricht VALUES (1,1,1,'NAchicht', '2020-05-31T20:15');