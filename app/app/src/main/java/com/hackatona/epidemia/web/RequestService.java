package com.hackatona.epidemia.web;

import com.hackatona.epidemia.entity.DoencaCoordenada;
import com.hackatona.epidemia.entity.Sintoma;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RequestService {

    public interface BookmarkCallback {
        void onSuccess(List<Sintoma> list);

        void onError();
    }

    public interface BookmarkCallbackCoordenada {
        void onSuccess(List<DoencaCoordenada> list);

        void onError();
    }
  public interface BookmarkCallbackDoencas {
        void onSuccess(List<Sintoma> list);

        void onError();
    }

    public void retornarSintomas(final BookmarkCallback callback) {

        Call<List<Sintoma>> call = new RetrofitConfig().getServices().requestSintoma();


        call.enqueue(new Callback<List<Sintoma>>() {
            @Override
            public void onResponse(Call<List<Sintoma>> call, Response<List<Sintoma>> response) {
                List<Sintoma> list = new ArrayList<>();
                Sintoma sintoma;
                if (!response.isSuccessful()) {
                    callback.onError();
                } else {



                    for (Sintoma size : response.body()) {

                        sintoma = new Sintoma(size.getNome(), size.getIdSintoma());

                        list.add(sintoma);

                    }
                    callback.onSuccess(list);
                }
            }

            @Override
            public void onFailure(Call<List<Sintoma>> call, Throwable t) {
                t.printStackTrace();
                callback.onError();
            }
        });
    }

    public void enviarSintomas(final BookmarkCallbackDoencas callback, List<Sintoma> listaSintomas) {

        Call<List<Sintoma>> call = new RetrofitConfig().getServices().sendSintoma(listaSintomas);


        call.enqueue(new Callback<List<Sintoma>>() {
            @Override
            public void onResponse(Call<List<Sintoma>> call, Response<List<Sintoma>> response) {
                List<Sintoma> list = new ArrayList<>();
                if (!response.isSuccessful()) {
                    callback.onError();
                } else {



                    for (Sintoma size : response.body()) {

                        list.add(new Sintoma(size.getNome(), size.getIdSintoma(), size.getQuantidade()));

                    }
                    callback.onSuccess(list);
                }
            }

            @Override
            public void onFailure(Call<List<Sintoma>> call, Throwable t) {
                t.printStackTrace();
                callback.onError();
            }
        });
    }

    public void enviarCoordenadas(final BookmarkCallbackCoordenada callback, double latitude, double longitude) {

        Call<List<DoencaCoordenada>> call = new RetrofitConfig().getServices().sendCoordenadas(latitude, longitude);


        call.enqueue(new Callback<List<DoencaCoordenada>>() {
            @Override
            public void onResponse(Call<List<DoencaCoordenada>> call, Response<List<DoencaCoordenada>> response) {
                List<DoencaCoordenada> list = new ArrayList<>();
                DoencaCoordenada doencaCoordenada;
                if (!response.isSuccessful()) {
                    callback.onError();
                } else {



                    for (DoencaCoordenada size : response.body()) {

                        doencaCoordenada = new DoencaCoordenada(size.getNome(), size.isEpidemia(), size.getQuantidade());

                        list.add(doencaCoordenada);

                    }
                    callback.onSuccess(list);
                }
            }

            @Override
            public void onFailure(Call<List<DoencaCoordenada>> call, Throwable t) {
                t.printStackTrace();
                callback.onError();
            }
        });
    }


}
