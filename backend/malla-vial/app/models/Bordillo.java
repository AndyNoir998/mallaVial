package models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

@Entity
public class Bordillo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Float altura;

    @Column(nullable = false)
    private String material;

    @ManyToOne
    @JoinColumn(name = "segmento_id", nullable = false)
    @JsonIgnoreProperties({"numeroSegmento", "direccion", "longitud", "calzadas", "bordillos"}) // Ignorar detalles del Segmento
    private Segmento segmento;

    public Bordillo() {}

    // Constructor
    public Bordillo(Float altura, String material, Segmento segmento) {
        this.altura = altura;
        this.material = material;
        this.segmento = segmento;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAltura() {
        return altura;
    }

    public void setAltura(Float altura) {
        this.altura = altura;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Segmento getSegmento() {
        return segmento;
    }

    public void setSegmento(Segmento segmento) {
        this.segmento = segmento;
    }

    @Override
    public String toString() {
        return "Bordillo{" +
                "id=" + id +
                ", altura=" + altura +
                ", material='" + material + '\'' +
                ", segmento=" + (segmento != null ? segmento.getId() : null) +
                '}';
    }
}
