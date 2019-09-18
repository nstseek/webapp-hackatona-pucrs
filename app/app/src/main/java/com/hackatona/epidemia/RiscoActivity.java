package com.hackatona.epidemia;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.hackatona.epidemia.entity.DoencaCoordenada;

import java.util.List;

import static com.hackatona.epidemia.util.Constants.RISCOS_AREA;

public class RiscoActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_risco);

        ListView listview = findViewById(R.id.lista);


        final List<DoencaCoordenada> lista = (List<DoencaCoordenada>) getIntent().getSerializableExtra(RISCOS_AREA);

        listview.setAdapter(new ArrayAdapter<DoencaCoordenada>(this, android.R.layout.simple_list_item_1, lista) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                View row = super.getView(position, convertView, parent);


                if (lista.get(position).isEpidemia()) {
                    row.setBackgroundColor(ContextCompat.getColor(getApplicationContext(), R.color.danger));
                } else {
                    row.setBackgroundColor(0x00000000);
                }

                return row;
            }
        });

    }
}
