- Starten des Servers:

	1. npm install in 'Backend'
	2. node server.js in 'Backend'
	3. npm install in 'Frontend/FrontEndServer'
	4. node app.js in 'Frontend/FrontEndServer'
	5. 'http://localhost/home.html' im Browser eingeben

- Beschreibung um sich ein Video anzuschauen:

	Aktuell existiert nur ein Video zu Ruf der Wildnis 

	1. Erstellen Sie in der Datenbank eine neue Vorstellung für die FIlmID 1(da für die anderen Filme keine Videos hinterlegt sind)
		- INSERT INTO Vorstellung (FilmID,Datum) VALUES (1,'2020-05-31T20:15'); 
		- Datum ändern
	2. Achten Sie darauf, dass der Zeitpunkt der Vorstellung in der Zukunft liegt und genug Zeit ist um die nächsten Schritte auszuführen
	3. Starten Sie den Frontend und Backend Server
	4. Wählen Sie den Film auf der Startseite aus und wählen die neu angelegte Vorstellung 
	5. Schließen Sie den Bezahlvorgang ab (ticket wird ihnen an die angegebene E-Mail geschickt nach der Kasse)
	6. Gehen Sie zu Kinosaal und geben den per E-Mail zugesendeten Code ein
	7. Warten Sie bis die von Ihnen eingebene Zeit ereicht ist und das Video sollte automatisch abgespielt werden
	8. Den Chat können sie jederzeit benutzen
	9. Geniesen Sie den Film

- Sonstige Bemerkungen:

	1. Für das Datum 'Heute' wird in 'home' und 'fimmuebersicht' der 31.05.2020 verwendet, da nur zukünftige Vorstellungen angezeigt werden und man sonst immer neue Vorstellungen anlegen müsste
	2. Bei der Ticket-Eingabe wird jedoch das aktuelle Datum verwendet 