import com.google.inject.AbstractModule;
import dao.CalzadaDAO;
import dao.CalzadaDAOImpl;
import dao.SegmentoDAO;
import dao.SegmentoDAOImpl;
import dao.BordilloDAO;
import dao.BordilloDAOImpl;

public class Module extends AbstractModule {
    @Override
    protected void configure() {
        // Bind DAOs
        bind(CalzadaDAO.class).to(CalzadaDAOImpl.class);
        bind(SegmentoDAO.class).to(SegmentoDAOImpl.class);
        bind(BordilloDAO.class).to(BordilloDAOImpl.class);
    }
}


