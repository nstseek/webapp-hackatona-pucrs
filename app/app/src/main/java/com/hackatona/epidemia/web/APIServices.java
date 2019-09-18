package com.hackatona.epidemia.web;

import com.hackatona.epidemia.entity.*;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

import static com.hackatona.epidemia.util.Constants.*;

public interface APIServices {


        @GET(REQUEST_SINTOMA)
        Call<List<Sintoma>> requestSintoma();

        @POST(SEND_SINTOMAS)
        Call<List<Sintoma>> sendSintoma(@Body List<Sintoma> listaSintomas);

        @GET(SEND_COORDENADAS)
        Call<List<DoencaCoordenada>> sendCoordenadas(@Path("latitude") double latitude, @Path("longitude") double longitude);


}
