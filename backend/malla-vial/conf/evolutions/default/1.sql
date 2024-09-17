
CREATE TABLE segmento (
    id SERIAL PRIMARY KEY,
    numero_segmento VARCHAR(20) NOT NULL UNIQUE,
    direccion VARCHAR(100),
    longitud DOUBLE PRECISION
);

CREATE TABLE calzada (
    id SERIAL PRIMARY KEY,
    tipo_pavimento VARCHAR(50),
    ancho DOUBLE PRECISION,
    segmento_id INT NOT NULL,
    CONSTRAINT fk_segmento_calzada FOREIGN KEY(segmento_id) REFERENCES segmento(id) ON DELETE CASCADE
);

CREATE TABLE bordillo (
    id SERIAL PRIMARY KEY,
    altura DOUBLE PRECISION,
    material VARCHAR(50),
    segmento_id INT NOT NULL,
    CONSTRAINT fk_segmento_bordillo FOREIGN KEY(segmento_id) REFERENCES segmento(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS bordillo;
DROP TABLE IF EXISTS calzada;
DROP TABLE IF EXISTS segmento;

