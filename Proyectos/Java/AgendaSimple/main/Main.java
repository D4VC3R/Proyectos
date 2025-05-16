package ejercicios.ej12.main;


import ejercicios.ej12.menu.Menu;
import ejercicios.ej12.agenda.Agenda;

import java.io.File;


public class Main {
    public static void main(String[] args) {

        String rutaArchivo = System.getProperty("user.dir") + File.separator + "src" + File.separator + "archivos" + File.separator + "clientes.dat";
        Agenda agenda = new Agenda(rutaArchivo);
        Menu menu = new Menu(agenda);

        menu.mostrarMenu();

    }

}
