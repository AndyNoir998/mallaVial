package dao;

import models.Bordillo;
import java.util.List;
import java.util.Optional;

public interface BordilloDAO {
    Bordillo save(Bordillo bordillo);
    Optional<Bordillo> findById(Long id);
    List<Bordillo> findAll();
    Bordillo update(Bordillo bordillo);
    void delete(Long id);
}
