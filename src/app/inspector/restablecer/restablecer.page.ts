import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {APIURL} from 'src/Shares/UrlApi'
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage  {
  private apiUrl =APIURL
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController) { this.changePasswordForm = this.fb.group({
      userId: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    }); }

    async onSubmit() {
      if (this.changePasswordForm.valid) {
        const { userId, newPassword } = this.changePasswordForm.value;
        const url = `${this.apiUrl}/user/users/change-password`;
  const idUser="user"+userId
        this.http.put(url, { newPassword: newPassword,userId:idUser }).subscribe(
          async (response) => {
            const toast = await this.toastController.create({
              message: 'Contraseña cambiada con éxito',
              duration: 2000,
              color: 'success'
            });

            await toast.present();
            this.changePasswordForm.reset();
          },
          async (error) => {
            const toast = await this.toastController.create({
              message: 'Error al cambiar la contraseña',
              duration: 2000,
              color: 'danger'
            });
            await toast.present();
          }
        );
      }
    }

}
