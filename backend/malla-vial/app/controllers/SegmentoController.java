package controllers;

import dao.SegmentoDAO;
import models.Segmento;
import play.libs.Json;
import play.mvc.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class SegmentoController extends Controller {

    private final SegmentoDAO segmentoDAO;

    @Inject
    public SegmentoController(SegmentoDAO segmentoDAO) {
        this.segmentoDAO = segmentoDAO;
    }

    // Crear un nuevo Segmento
    public Result createSegmento(Http.Request request) {
        try {
            Segmento segmento = Json.fromJson(request.body().asJson(), Segmento.class);
            if (segmento == null) {
                return badRequest(Json.toJson("Datos inválidos o incompletos"));
            }
            segmentoDAO.save(segmento);
            return created(Json.toJson(segmento));
        } catch (Exception e) {
            return badRequest(Json.toJson("Error al procesar los datos del Segmento"));
        }
    }

    // Obtener todos los Segmentos
    public Result getAllSegmentos() {
        try {
            List<Segmento> segmentos = segmentoDAO.findAllWithCalzadasAndBordillos();
            return ok(Json.toJson(segmentos));
        } catch (Exception e) {
            return internalServerError(Json.toJson("Error al obtener los segmentos"));
        }
    }

    // Obtener un Segmento por ID
    public Result getSegmentoById(Long id) {
        try {
            Optional<Segmento> segmentoOpt = segmentoDAO.findById(id);
            if (segmentoOpt.isPresent()) {
                return ok(Json.toJson(segmentoOpt.get()));
            } else {
                return notFound(Json.toJson("Segmento no encontrado"));
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log de errores
            return internalServerError(Json.toJson("Error interno del servidor"));
        }
    }

    // Actualizar un Segmento
    public Result updateSegmento(Long id, Http.Request request) {
        Optional<Segmento> segmentoOpt = segmentoDAO.findById(id);
        if (segmentoOpt.isPresent()) {
            try {
                Segmento segmento = Json.fromJson(request.body().asJson(), Segmento.class);
                if (segmento == null) {
                    return badRequest(Json.toJson("Datos inválidos o incompletos"));
                }
                segmento.setId(id);
                segmentoDAO.update(segmento);
                return ok(Json.toJson(segmento));
            } catch (Exception e) {
                return badRequest(Json.toJson("Error al procesar los datos del Segmento"));
            }
        } else {
            return notFound(Json.toJson("Segmento no encontrado"));
        }
    }

    // Eliminar un Segmento
    public Result deleteSegmento(Long id) {
        Optional<Segmento> segmentoOpt = segmentoDAO.findById(id);
        if (segmentoOpt.isPresent()) {
            segmentoDAO.delete(id);
            return ok(Json.toJson("Segmento eliminado"));
        } else {
            return notFound(Json.toJson("Segmento no encontrado"));
        }
    }
}

