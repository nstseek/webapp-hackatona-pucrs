package com.hackatona.epidemia;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Parcelable;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.hackatona.epidemia.entity.DoencaCoordenada;
import com.hackatona.epidemia.entity.Sintoma;
import com.hackatona.epidemia.util.GPSTrackerActivity;
import com.hackatona.epidemia.web.RequestService;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.hackatona.epidemia.util.Constants.*;

public class MainActivity extends AppCompatActivity {

    List<Sintoma> listaSintomas = new ArrayList<>();
    RequestService requestService = new RequestService();
    AutoCompleteTextView campoSintoma;
    List<Sintoma> sintomasConfirmados = new ArrayList<>();
    TextView sintomasCadastrados;
    Double longitude;
    Double latitude;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        campoSintoma = findViewById(R.id.sintomaCampo);
        sintomasCadastrados = findViewById(R.id.sintomasCadastrados);
        sintomasCadastrados.setText("");


        requestService.retornarSintomas(new RequestService.BookmarkCallback() {
            @Override
            public void onSuccess(List<Sintoma> list) {

                listaSintomas.addAll(list);
                String[] listaSintomasNome = new String[list.size()];

                for (int i = 0; i < list.size(); i++) {
                    listaSintomasNome[i] = list.get(i).getNome();
                }

                campoSintoma.setAdapter(new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_list_item_1, listaSintomasNome));

            }

            @Override
            public void onError() {

            }
        });


        Button botaoAdd = findViewById(R.id.botaoAdd);
        botaoAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (campoSintoma.getText().toString().matches("")) {
                    Toast.makeText(getApplicationContext(), "Digite algo!", Toast.LENGTH_LONG).show();
                } else {
                    for (int i = 0; i < listaSintomas.size(); i++) {
                        if (campoSintoma.getText().toString().equalsIgnoreCase(listaSintomas.get(i).getNome())) {
                            sintomasConfirmados.add(new Sintoma(listaSintomas.get(i).getNome(), listaSintomas.get(i).getIdSintoma()));
                            sintomasCadastrados.setText(sintomasCadastrados.getText().toString() + listaSintomas.get(i).getNome() + '\n');
                            campoSintoma.setText("");
                        }
                    }
                }
                System.out.println(sintomasConfirmados);
            }
        });

        ImageView biohazard = findViewById(R.id.biohazard);
        biohazard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                requestService.enviarCoordenadas(new RequestService.BookmarkCallbackCoordenada() {
                    @Override
                    public void onSuccess(List<DoencaCoordenada> list) {
                        Intent intent = new Intent(getApplicationContext(), RiscoActivity.class);
                        intent.putExtra(RISCOS_AREA, (Serializable) list);
                        startActivity(intent);
                    }

                    @Override
                    public void onError() {

                    }
                }, latitude, longitude);


            }
        });

        Button botaoPronto = findViewById(R.id.botaoPronto);
        botaoPronto.setOnClickListener(new View.OnClickListener() {
            @Override

            public void onClick(View view) {


                requestService.enviarSintomas(new RequestService.BookmarkCallbackDoencas() {
                    @Override
                    public void onSuccess(List<Sintoma> list) {
                        Intent intent = new Intent(getApplicationContext(), ResultActivity.class);
                        intent.putExtra(RESULTADOS_DOENCAS, (Serializable) list);
                        startActivity(intent);
                        finish();
                    }

                    @Override
                    public void onError() {

                    }
                }, sintomasConfirmados);


            }
            });

        Intent intent = new Intent(this, GPSTrackerActivity.class);
        startActivityForResult(intent,1);


    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 1){
            Bundle extras = data.getExtras();
            longitude = extras.getDouble("Longitude");
            latitude = extras.getDouble("Latitude");
        }
    }

}
