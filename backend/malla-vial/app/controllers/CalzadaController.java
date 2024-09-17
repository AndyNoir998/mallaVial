package controllers;

import dao.CalzadaDAO;
import models.Calzada;
import play.libs.Json;
import play.mvc.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class CalzadaController extends Controller {

    private final CalzadaDAO calzadaDAO;

    @Inject
    public CalzadaController(CalzadaDAO calzadaDAO) {
        this.calzadaDAO = calzadaDAO;
    }

    // Crear una nueva Calzada
    public Result createCalzada(Http.Request request) {
        try {
            Calzada calzada = Json.fromJson(request.body().asJson(), Calzada.class);
            if (calzada == null) {
                return badRequest(Json.toJson("Datos inválidos o incompletos"));
            }
            calzadaDAO.save(calzada);
            return created(Json.toJson(calzada));
        } catch (Exception e) {
            return badRequest(Json.toJson("Error al procesar los datos de la Calzada"));
        }
    }

    // Obtener todas las Calzadas
    public Result getAllCalzadas() {
        List<Calzada> calzadas = calzadaDAO.findAll();
        return ok(Json.toJson(calzadas));
    }

    // Obtener una Calzada por ID
    public Result getCalzadaById(Long id) {
        Optional<Calzada> calzadaOpt = calzadaDAO.findById(id);
        if (calzadaOpt.isPresent()) {
            return ok(Json.toJson(calzadaOpt.get()));
        } else {
            return notFound(Json.toJson("Calzada no encontrada"));
        }
    }

    // Actualizar una Calzada
    public Result updateCalzada(Long id, Http.Request request) {
        Optional<Calzada> calzadaOpt = calzadaDAO.findById(id);
        if (calzadaOpt.isPresent()) {
            try {
                Calzada calzada = Json.fromJson(request.body().asJson(), Calzada.class);
                if (calzada == null) {
                    return badRequest(Json.toJson("Datos inválidos o incompletos"));
                }
                calzada.setId(id);
                calzadaDAO.update(calzada);
                return ok(Json.toJson(calzada));
            } catch (Exception e) {
                return badRequest(Json.toJson("Error al procesar los datos de la Calzada"));
            }
        } else {
            return notFound(Json.toJson("Calzada no encontrada"));
        }
    }

    // Eliminar una Calzada
    public Result deleteCalzada(Long id) {
        Optional<Calzada> calzadaOpt = calzadaDAO.findById(id);
        if (calzadaOpt.isPresent()) {
            calzadaDAO.delete(id);
            return ok(Json.toJson("Calzada eliminada"));
        } else {
            return notFound(Json.toJson("Calzada no encontrada"));
        }
    }
}
