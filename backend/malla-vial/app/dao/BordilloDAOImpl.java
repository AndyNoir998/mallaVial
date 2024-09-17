package dao;

import models.Bordillo;
import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public class BordilloDAOImpl implements BordilloDAO {

    private final JPAApi jpaApi;

    @Inject
    public BordilloDAOImpl(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    @Override
    @Transactional
    public Bordillo save(Bordillo bordillo) {
        return jpaApi.withTransaction(em -> {
            em.persist(bordillo);
            return bordillo;
        });
    }

    @Override
    public Optional<Bordillo> findById(Long id) {
        return jpaApi.withTransaction(em -> {
            Bordillo bordillo = em.find(Bordillo.class, id);
            return Optional.ofNullable(bordillo);
        });
    }

    @Override
    public List<Bordillo> findAll() {
        return jpaApi.withTransaction(em -> {
            return em.createQuery("SELECT b FROM Bordillo b", Bordillo.class).getResultList();
        });
    }

    @Override
    @Transactional
    public Bordillo update(Bordillo bordillo) {
        return jpaApi.withTransaction(em -> {
            return em.merge(bordillo);
        });
    }

    @Override
    @Transactional
    public void delete(Long id) {
        jpaApi.withTransaction(em -> {
            Bordillo bordillo = em.find(Bordillo.class, id);
            if (bordillo != null) {
                em.remove(bordillo);
            }
        });
    }
}
