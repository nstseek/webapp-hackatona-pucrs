package com.hackatona.epidemia.entity;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Random;

public class Sintoma implements Serializable {

    @SerializedName("nome")
    private String nome;

    @SerializedName("idSintoma")
    private int idSintoma;

    @SerializedName("num")
    private int quantidade;


    public Sintoma(String nome, int idSintoma, int quantidade) {
        this.nome = nome;
        this.idSintoma = idSintoma;
        this.quantidade = quantidade;
    }

    public Sintoma(String nome, int idSintoma) {
        this.nome = nome;
        this.idSintoma = idSintoma;
    }


    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdSintoma() {
        return idSintoma;
    }

    public void setIdSintoma(int idSintoma) {
        this.idSintoma = idSintoma;
    }

    @Override
    public String toString() {

        return "Nome: " + nome + '\n' +
                "% de chances: " + ((10 * quantidade * 0.01) * 100) + "%  ";
    }
}
