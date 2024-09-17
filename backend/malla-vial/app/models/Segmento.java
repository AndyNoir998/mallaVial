package models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Segmento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_segmento", nullable = false, unique = true)
    private String numeroSegmento;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private Float longitud;

    @OneToMany(mappedBy = "segmento", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Calzada> calzadas = new HashSet<>();

    @OneToMany(mappedBy = "segmento", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Bordillo> bordillos = new HashSet<>();

    // Constructor por defecto (requerido por JPA)
    public Segmento() {}

    // Constructor completo
    public Segmento(String numeroSegmento, String direccion, Float longitud) {
        this.numeroSegmento = numeroSegmento;
        this.direccion = direccion;
        this.longitud = longitud;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroSegmento() {
        return numeroSegmento;
    }

    public void setNumeroSegmento(String numeroSegmento) {
        this.numeroSegmento = numeroSegmento;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Float getLongitud() {
        return longitud;
    }

    public void setLongitud(Float longitud) {
        this.longitud = longitud;
    }

    public Set<Calzada> getCalzadas() {
        return calzadas;
    }

    public void setCalzadas(Set<Calzada> calzadas) {
        this.calzadas = calzadas;
    }

    public Set<Bordillo> getBordillos() {
        return bordillos;
    }

    public void setBordillos(Set<Bordillo> bordillos) {
        this.bordillos = bordillos;
    }

    // Método para añadir una Calzada al Segmento
    public void addCalzada(Calzada calzada) {
        this.calzadas.add(calzada);
        calzada.setSegmento(this);
    }

    // Método para añadir un Bordillo al Segmento
    public void addBordillo(Bordillo bordillo) {
        this.bordillos.add(bordillo);
        bordillo.setSegmento(this);
    }

    @Override
    public String toString() {
        return "Segmento{" +
                "id=" + id +
                ", numeroSegmento='" + numeroSegmento + '\'' +
                ", direccion='" + direccion + '\'' +
                ", longitud=" + longitud +
                ", calzadas=" + calzadas.size() +
                ", bordillos=" + bordillos.size() +
                '}';
    }
}
