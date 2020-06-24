import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.service'
import { UploadService } from '../../services/upload.service'
import { Global } from '../../services/global'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    ProjectService,
    UploadService
  ]
})
export class EditComponent implements OnInit {
        public title: string
        public url: string
        public project: Project
        public saveProject
        public status: string
        public filesToUpload:Array<File>

        constructor(
            private _projectService: ProjectService,
            private _uploadService: UploadService,
            private _route: ActivatedRoute,
            private router: Router
        ) { 
            this.title = 'Editar Proyecto'
            this.url = Global.url
        }

        ngOnInit(){
          this._route.params.subscribe(params =>{
              let id = params.id

              this.getProject(id)
          })
      }

      getProject(id){
          this._projectService.getProject(id).subscribe(
            response =>{
                this.project = response.project
            },
            error =>{
                console.log(error)
            }
          )
      }

      onSubmit(form){
        //Guardar Datos basicos
        this._projectService.updateProject(this.project).subscribe(
          response =>{
            if (response.project) {
                
                console.log(response)
                //Subir Imagen
                if (this.filesToUpload) {
                      this._uploadService.makeFileRequest(Global.url+'uploadImage/'+response.project._id, [], this.filesToUpload, 'image')
                      .then((result: any)=>{
      
                        this.saveProject = result.project
                        this.status = 'success'
                      }) 
                }else{
                    this.saveProject = response.project
                    this.status = 'success'
                }
            } else {
                this.status = 'failed'
            }
          },
          error=>{
            console.log(<any>error)
          }
        )
    }

    fileChangeEvent(fileInput: any){
      console.log(fileInput)
        this.filesToUpload = <Array<File>>fileInput.target.files
    }

}
