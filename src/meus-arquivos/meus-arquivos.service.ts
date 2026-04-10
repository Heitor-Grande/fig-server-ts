import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';

@Injectable()
export class MeusArquivosService {
    //carrega os arquivos do usuario
    async carregarUploadUsuarioById(res: Response) {
        try {
            const SqlSelectArquivosUsuario = `
            SELECT 
            id_arquivo as id, 
            name,
            filebase64,
            type,
            id_usuario,
            to_char(criacao, 'DD/MM/YYYY') as criacao,
            size
            FROM public.arquivosusuario
            WHERE id_usuario = $1
            `
            const sqlSelectArquivosUsuarioValues = [res.locals.idUsuario]
            const arquivos = (await connection.query(SqlSelectArquivosUsuario, sqlSelectArquivosUsuarioValues)).rows
            return arquivos
        } catch (error) {
            throw new HttpException("Erro ao carregar upload(s).", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //cria novo arquivo do usuario
    async criarNovoUpLoad(body: any, res: Response) {
        try {
            const { arquivosImportados } = body
  
            for (let i = 0; i < arquivosImportados.length; i = i + 1) {
                const arquivo = arquivosImportados[i]
                const SqlInsertarquivosusuario = `
                INSERT INTO public.arquivosusuario
                (id_usuario, filebase64, "name", "type", "size", criacao)
                VALUES($1, $2, $3, $4, $5, $6)
                `
                const sqlInsertArquivoUsuarioValues = [res.locals.idUsuario, arquivo.fileBase64, arquivo.name, arquivo.type, arquivo.size, 'now()']
                await connection.query(SqlInsertarquivosusuario, sqlInsertArquivoUsuarioValues)
            }
            return "Arquivo(s) importado(s) com sucesso."
        } catch (error) {
            throw new HttpException("Erro ao importar arquivo(s).", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //exclui um upload do usuario
    async excluirUpload(params: any, res: Response) {
        try {
            const { id_arquivo } = params
            const SqlDeleteArquivosUsuario = `
            DELETE FROM arquivosusuario 
            where id_usuario= $1 and id_arquivo = $2
            `
            const sqlDeleteArquivosUsuarioValues = [res.locals.idUsuario, id_arquivo]
            await connection.query(SqlDeleteArquivosUsuario, sqlDeleteArquivosUsuarioValues)
            return "Arquivo excluido com sucesso."
        } catch (error) {
            throw new HttpException("Erro ao excluir arquivo.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
