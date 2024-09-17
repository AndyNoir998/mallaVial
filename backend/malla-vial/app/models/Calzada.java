package models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

@Entity
public class Calzada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_pavimento", nullable = false)
    private String tipoPavimento;

    @Column(nullable = false)
    private Float ancho;

    @ManyToOne
    @JoinColumn(name = "segmento_id", nullable = false)
    @JsonIgnoreProperties({"numeroSegmento", "direccion", "longitud", "calzadas", "bordillos"}) // Ignorar detalles del Segmento
    private Segmento segmento;

    public Calzada() {}

    // Constructor
    public Calzada(String tipoPavimento, Float ancho, Segmento segmento) {
        this.tipoPavimento = tipoPavimento;
        this.ancho = ancho;
        this.segmento = segmento;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoPavimento() {
        return tipoPavimento;
    }

    public void setTipoPavimento(String tipoPavimento) {
        this.tipoPavimento = tipoPavimento;
    }

    public Float getAncho() {
        return ancho;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Segmento getSegmento() {
        return segmento;
    }

    public void setSegmento(Segmento segmento) {
        this.segmento = segmento;
    }

    @Override
    public String toString() {
        return "Calzada{" +
                "id=" + id +
                ", tipoPavimento='" + tipoPavimento + '\'' +
                ", ancho=" + ancho +
                ", segmento=" + (segmento != null ? segmento.getId() : null) +
                '}';
    }
}
