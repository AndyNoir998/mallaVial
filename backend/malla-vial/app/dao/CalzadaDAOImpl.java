package dao;

import models.Calzada;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public class CalzadaDAOImpl implements CalzadaDAO {

    private final JPAApi jpaApi;

    @Inject
    public CalzadaDAOImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    @Transactional
    public Calzada save(Calzada calzada) {
        return jpaApi.withTransaction(em -> {
            em.persist(calzada);
            return calzada;
        });
    }

    @Override
    public Optional<Calzada> findById(Long id) {
        return jpaApi.withTransaction(em -> {
            Calzada calzada = em.find(Calzada.class, id);
            return Optional.ofNullable(calzada);
        });
    }

    @Override
    public List<Calzada> findAll() {
        return jpaApi.withTransaction(em -> {
            return em.createQuery("SELECT c FROM Calzada c", Calzada.class).getResultList();
        });
    }

    @Override
    @Transactional
    public Calzada update(Calzada calzada) {
        return jpaApi.withTransaction(em -> {
            return em.merge(calzada);
        });
    }

    @Override
    @Transactional
    public void delete(Long id) {
        jpaApi.withTransaction(em -> {
            Calzada calzada = em.find(Calzada.class, id);
            if (calzada != null) {
                em.remove(calzada);
            }
        });
    }
}
