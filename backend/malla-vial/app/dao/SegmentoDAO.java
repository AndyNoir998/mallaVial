package dao;

import models.Segmento;
import java.util.List;
import java.util.Optional;

public interface SegmentoDAO {
    Segmento save(Segmento segmento);
    Optional<Segmento> findById(Long id);
    List<Segmento> findAll();
    Segmento update(Segmento segmento);
    void delete(Long id);
    List<Segmento> findAllWithCalzadasAndBordillos();
}
