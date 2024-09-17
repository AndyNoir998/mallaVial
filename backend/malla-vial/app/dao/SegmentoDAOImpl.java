package dao;

import models.Segmento;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public class SegmentoDAOImpl implements SegmentoDAO {

    private final JPAApi jpaApi;

    @Inject
    public SegmentoDAOImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    @Transactional
    public Segmento save(Segmento segmento) {
        return jpaApi.withTransaction(em -> {
            em.persist(segmento);
            return segmento;
        });
    }

    @Override
    public Optional<Segmento> findById(Long id) {
        return jpaApi.withTransaction(em -> {
            List<Segmento> result = em.createQuery(
                            "SELECT s FROM Segmento s LEFT JOIN FETCH s.calzadas LEFT JOIN FETCH s.bordillos WHERE s.id = :id",
                            Segmento.class
                    )
                    .setParameter("id", id)
                    .getResultList();
            return result.stream().findFirst();
        });
    }

    @Override
    public List<Segmento> findAll() {
        return jpaApi.withTransaction(em -> {
            TypedQuery<Segmento> query = em.createQuery("SELECT s FROM Segmento s", Segmento.class);
            return query.getResultList();
        });
    }

    @Override
    @Transactional
    public Segmento update(Segmento segmento) {
        return jpaApi.withTransaction(em -> {
            return em.merge(segmento);
        });
    }

    @Override
    @Transactional
    public void delete(Long id) {
        jpaApi.withTransaction(em -> {
            Segmento segmento = em.find(Segmento.class, id);
            if (segmento != null) {
                em.remove(segmento);
            }
        });
    }

    // Nuevo método para cargar colecciones relacionadas
    @Override
    public List<Segmento> findAllWithCalzadasAndBordillos() {
        return jpaApi.withTransaction(em -> {
            try {
                TypedQuery<Segmento> query = em.createQuery(
                        "SELECT s FROM Segmento s LEFT JOIN FETCH s.calzadas LEFT JOIN FETCH s.bordillos",
                        Segmento.class
                );
                return query.getResultList();
            } catch (Exception e) {
                // Aquí puedes agregar un log para depuración
                e.printStackTrace();
                return List.of(); // Devuelve una lista vacía en caso de error
            }
        });
    }

}
