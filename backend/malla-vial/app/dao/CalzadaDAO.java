
package dao;

import models.Calzada;
import java.util.List;
import java.util.Optional;

public interface CalzadaDAO {
    Calzada save(Calzada calzada);
    Optional<Calzada> findById(Long id);
    List<Calzada> findAll();
    Calzada update(Calzada calzada);
    void delete(Long id);
}
