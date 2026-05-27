/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/WebService.java to edit this template
 */
package ar.edu.uner.fcad.tudw.prog3.soapjavaproject;

import ar.edu.uner.fcad.tudw.prog3.soapjavaproject.clases.Persona;
import java.util.ArrayList;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;

/**
 *
 * @author nacho
 */
@WebService(serviceName = "WsPersonas")
public class WsPersonas {

    @WebMethod(operationName = "findAll")
    public List<Persona> findAll() {
        List<Persona> res = new ArrayList();
        
        res.add(new Persona("Lionel", "Messi", 38));
        res.add(new Persona("Martínez", "Damián Emiliano", 32));
        res.add(new Persona("Martínez", "Lisandro", 26));
        
        return res;
    }
}
