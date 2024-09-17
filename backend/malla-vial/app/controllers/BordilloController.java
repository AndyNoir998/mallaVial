
package controllers;

import dao.BordilloDAO;
import models.Bordillo;
import play.libs.Json;
import play.mvc.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class BordilloController extends Controller {

    private final BordilloDAO bordilloDAO;

    @Inject
    public BordilloController(BordilloDAO bordilloDAO) {
        this.bordilloDAO = bordilloDAO;
    }

    // Crear un nuevo Bordillo
    public Result createBordillo(Http.Request request) {
        try {
            Bordillo bordillo = Json.fromJson(request.body().asJson(), Bordillo.class);
            if (bordillo == null) {
                return badRequest(Json.toJson("Datos inválidos o incompletos"));
            }
            bordilloDAO.save(bordillo);
            return created(Json.toJson(bordillo));
        } catch (Exception e) {
            return badRequest(Json.toJson("Error al procesar los datos del Bordillo"));
        }
    }

    // Obtener todos los Bordillos
    public Result getAllBordillos() {
        List<Bordillo> bordillos = bordilloDAO.findAll();
        return ok(Json.toJson(bordillos));
    }

    // Obtener un Bordillo por ID
    public Result getBordilloById(Long id) {
        Optional<Bordillo> bordilloOpt = bordilloDAO.findById(id);
        if (bordilloOpt.isPresent()) {
            return ok(Json.toJson(bordilloOpt.get()));
        } else {
            return notFound(Json.toJson("Bordillo no encontrado"));
        }
    }

    // Actualizar un Bordillo
    public Result updateBordillo(Long id, Http.Request request) {
        Optional<Bordillo> bordilloOpt = bordilloDAO.findById(id);
        if (bordilloOpt.isPresent()) {
            try {
                Bordillo bordillo = Json.fromJson(request.body().asJson(), Bordillo.class);
                if (bordillo == null) {
                    return badRequest(Json.toJson("Datos inválidos o incompletos"));
                }
                bordillo.setId(id);
                bordilloDAO.update(bordillo);
                return ok(Json.toJson(bordillo));
            } catch (Exception e) {
                return badRequest(Json.toJson("Error al procesar los datos del Bordillo"));
            }
        } else {
            return notFound(Json.toJson("Bordillo no encontrado"));
        }
    }

    // Eliminar un Bordillo
    public Result deleteBordillo(Long id) {
        Optional<Bordillo> bordilloOpt = bordilloDAO.findById(id);
        if (bordilloOpt.isPresent()) {
            bordilloDAO.delete(id);
            return ok(Json.toJson("Bordillo eliminado"));
        } else {
            return notFound(Json.toJson("Bordillo no encontrado"));
        }
    }
}
