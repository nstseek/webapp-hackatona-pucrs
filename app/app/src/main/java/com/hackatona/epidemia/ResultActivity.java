package com.hackatona.epidemia;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.hackatona.epidemia.entity.DoencaCoordenada;
import com.hackatona.epidemia.entity.Sintoma;

import java.util.List;

import static com.hackatona.epidemia.util.Constants.*;

public class ResultActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        ListView listview = findViewById(R.id.listaDoencas);


        final List<Sintoma> lista = (List<Sintoma>) getIntent().getSerializableExtra(RESULTADOS_DOENCAS);

        ArrayAdapter<Sintoma> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, lista);

        listview.setAdapter(adapter);

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        startActivity(new Intent(this, MainActivity.class));
        finish();
    }
}
