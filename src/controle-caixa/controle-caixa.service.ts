import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';

@Injectable()
export class ControleCaixaService {
    async carregaMovimentosDoCaixaUsuario(res: Response) {
        try {
            const SqlSelectMovimento = `
            SELECT 
            titulo, 
            id_movimento as id,
            valor,
            to_char(datamovimento, 'DD/MM/YYYY') as datamovimento,
            tipo,
            id_usuario
            FROM movimentos
            WHERE
            id_usuario = $1
            order by id_movimento DESC`
            const sqlSelectMovimentoValues = [res.locals.idUsuario]
            const movimentos = (await connection.query(SqlSelectMovimento, sqlSelectMovimentoValues)).rows
            return {
                message: "Sucesso ao carregar movimentos",
                movimentos: movimentos
            }
        } catch (error) {
            throw new HttpException("Erro ao carregar movimentos.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async criaNovoMovimentoUsuario(body: any, res: Response) {
        try {
            const inputsMovimento = body.inputsMovimento
            const arquivosAnexados = body.arquivosAnexados
            const SqlInsertMovimento = `
            INSERT INTO movimentos
            (titulo, valor, datamovimento, tipo, id_usuario)
            VALUES($1, 
            $2, 
            $3,
            $4,
            $5) RETURNING id_movimento
            `
            const sqlInsertMovimentoValues = [
                inputsMovimento.titulo,
                inputsMovimento.valor.replaceAll(".", "").replace(",", "."),
                inputsMovimento.data,
                inputsMovimento.tipo,
                res.locals.idUsuario
            ]
            const id_movimento = (await connection.query(SqlInsertMovimento, sqlInsertMovimentoValues)).rows[0].id_movimento
            for (let i = 0; i < arquivosAnexados.length; i = i + 1) {
                const arquivo = arquivosAnexados[i]
                const SqlInsertAnexosMovimento = `
                INSERT INTO anexosmovimento
                (name, filebase64, type, size, id_usuario, id_movimento)
                values($1, $2, $3, $4, $5, $6)
                `
                const SqlInsertAnexosMovimentoValues = [arquivo.name, arquivo.fileBase64, arquivo.type, arquivo.size, res.locals.idUsuario, id_movimento]
                await connection.query(SqlInsertAnexosMovimento, SqlInsertAnexosMovimentoValues)
            }
            return "Movimento criado com sucesso."
        } catch (error) {
            throw new HttpException("Erro ao criar movimento.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async carregaMovimentoById(params: any, res: Response) {
        try {
            const { id_movimento } = params
            const SqlSelectMovimento = `
            SELECT 
            titulo, 
            id_movimento as id,
            valor,
            datamovimento,
            tipo,
            id_usuario
            FROM movimentos
            WHERE
            id_usuario = $1 AND
            id_movimento = $2
           `
            const sqlSelectMovimentoValues = [res.locals.idUsuario, id_movimento]
            const movimento = (await connection.query(SqlSelectMovimento, sqlSelectMovimentoValues)).rows[0]
            const SqlSelectAnexosMovimento = `
            SELECT 
            id_anexo as id, 
            name,
            filebase64,
            type,
            id_usuario,
            to_char(criacao, 'DD/MM/YYYY') as criacao,
            size,
            id_movimento
            FROM anexosmovimento where id_usuario = $1 and id_movimento = $2
            `
            const sqlSelectAnexosMovimentoValues = [res.locals.idUsuario, id_movimento]
            const anexosMovimento = (await connection.query(SqlSelectAnexosMovimento, sqlSelectAnexosMovimentoValues)).rows
            return {
                movimento: movimento,
                anexos: anexosMovimento
            }
        } catch (error) {
            throw new HttpException("Erro carregar movimento.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //atauliza movimento do usuario
    async atualizaMovimentoUsuario(params: any, body: any, res: Response) {
        try {
            const inputsMovimento = body.inputsMovimento
            const { id_movimento } = params
            const SqlUpdateMovimento = `
            UPDATE movimentos
            SET
              titulo = $1,
              tipo = $2,
              valor = $3,
              datamovimento = $4
            WHERE
              id_usuario = $5 AND id_movimento = $6
          `
            const SqlUpdateMovimentoValues = [
                inputsMovimento.titulo,
                inputsMovimento.tipo,
                inputsMovimento.valor.replaceAll('.', '').replace(',', '.'),
                inputsMovimento.data,
                res.locals.idUsuario,
                id_movimento,
            ]
            await connection.query(SqlUpdateMovimento, SqlUpdateMovimentoValues)
            return 'Movimento atualizado.'
        } catch (error) {
            throw new HttpException(`Erro ao atualizar movimento.`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //exclui o movimento do usuario
    async deletaMovimentoUsuario(params: any, res: Response) {
        try {
            const { id_movimento } = params
            const SqlDeleteMovimento = `
            DELETE FROM movimentos
            WHERE id_movimento = $1 AND id_usuario = $2
          `
            const SqlDeleteAnexosMovimento = `
            DELETE FROM anexosmovimento
            WHERE id_movimento = $1 AND id_usuario = $2
          `
            await connection.query(SqlDeleteMovimento, [id_movimento, res.locals.idUsuario])
            await connection.query(SqlDeleteAnexosMovimento, [id_movimento, res.locals.idUsuario])
            return 'Movimento excluído com sucesso.'
        } catch (error) {
            throw new HttpException(`Erro ao excluir movimento.`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //upload de mais arquivos para o movimento
    async uploadArquivosMovimento(params: any, body: any, res: Response) {
        try {
            const arquivosAnexados = body.arquivosAnexados
            const { id_movimento } = params
            for (const arquivo of arquivosAnexados) {
                const SqlInsertAnexosMovimento = `
                INSERT INTO anexosmovimento
                (name, filebase64, type, size, id_usuario, id_movimento)
                values($1, $2, $3, $4, $5, $6)
                `
                const SqlInsertAnexosMovimentoValues = [
                    arquivo.name,
                    arquivo.fileBase64,
                    arquivo.type,
                    arquivo.size,
                    res.locals.idUsuario,
                    id_movimento,
                ]
                await connection.query(SqlInsertAnexosMovimento, SqlInsertAnexosMovimentoValues)
            }
            return "Arquivos anexados com sucesso."
        } catch (error) {
            throw new HttpException(`Erro ao fazer upload de arquivo`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //exclui apenas o arquivo/upload anexado ao movimento
    async deletarAnexoMovimento(params: any, res: Response) {
        try {
            const { id_movimento, id_anexo } = params
            const SqlDeleteAnexosMovimento = `
            DELETE FROM public.anexosmovimento
            WHERE id_movimento = $1 AND id_usuario = $2 AND id_anexo = $3
          `
            const deleteParams = [id_movimento, res.locals.idUsuario, id_anexo]
            await connection.query(SqlDeleteAnexosMovimento, deleteParams)
            return 'Sucesso ao remover anexo do movimento.'
        } catch (error) {
            throw new HttpException('Erro ao remover anexo.', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
