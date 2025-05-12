import { test, expect } from '@playwright/test';

test('monitoreo portal', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://www.falp.org/');
    await page.getByRole('link', { name: ' Solicita tu hora' }).click();
    await page.getByText('Consulta Telemedicina').click();
    await page.getByRole('radio', { name: 'Buscar por especialidad' }).check();
    await page.locator('#optEspecialidad').selectOption('8');
    await page.getByRole('textbox', { name: '-1' }).click();
    await page.getByRole('textbox', { name: '-1' }).fill('159307417');
    await page.getByRole('button', { name: 'Buscar' }).click();

});

test('monitoreo botones', async ({ page }) => {
    test.setTimeout(60000);

    // Ir a la página con espera de carga
    await page.goto('https://www.falp.org/', { timeout: 60000, waitUntil: 'domcontentloaded' });

    // Verificar que el botón "Solicita tu hora" esté visible
    const solicitarHoraBtn = page.locator('#gtm_solicitar_hora_header');
    await expect(solicitarHoraBtn).toBeVisible({ timeout: 10000 });

    await page.waitForSelector('a.ingresar.boton_accion', { timeout: 30000 });

    const ingresarBtn = page.locator('a.ingresar.boton_accion');
    await expect(ingresarBtn).toHaveText(/Ingresar a mi FALP/i);
    await ingresarBtn.click();

});

test('monitoreo buscador ', async ({ page }) => {
    await page.goto('https://www.falp.org/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    const buscadorHome = page.locator('#form_buscador');
    await expect(buscadorHome).toBeVisible({ timeout: 10000 });
    await page.getByRole('textbox', { name: '¿Cómo podemos ayudarte?' }).click();
    await page.getByRole('textbox', { name: '¿Cómo podemos ayudarte?' }).fill('cancer');
    await page.getByRole('link', { name: 'Buscar Submit' }).click();

})

test('monitoreo header Paciente FALP con complicaciones', async ({ page }) => {
    await page.goto('https://www.falp.org/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    const headerPacienteComplicaciones = page.locator('a.color-gris', { hasText: 'Paciente FALP con complicaciones' });
    await expect(headerPacienteComplicaciones).toBeVisible({ timeout: 10000 });
    await headerPacienteComplicaciones.click();

});

test('monitoreo header callcenter', async ({ page }) => {
    await page.goto('https://www.falp.org/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    const headercallCenter = page.locator('a.color-gris', { hasText: 'callcenter@falp.org' });
    await expect(headercallCenter).toBeVisible({ timeout: 10000 });
    await headercallCenter.click();
    const formularioCallCenter = page.locator('#formulario_contacto');
    await expect(formularioCallCenter).toBeVisible({ timeout: 20000 });
    const documento = page.locator('label', { hasText: 'Tipo de documento de identificación ' });
    await expect(documento).toBeVisible({ timeout: 10000 });
    const nombre = page.locator('label', { hasText: 'Nombre' });
    await expect(nombre).toBeVisible({ timeout: 10000 });
    const apellidoPaterno = page.locator('label', { hasText: 'Apellido Paterno' });
    await expect(apellidoPaterno).toBeVisible({ timeout: 10000 });
    const apellidoMaterno = page.locator('label', { hasText: 'Apellido Materno' });
    await expect(apellidoMaterno).toBeVisible({ timeout: 10000 });
    const Sexo = page.locator('label', { hasText: 'Sexo' });
    await expect(Sexo).toBeVisible({ timeout: 10000 });
    const fechaNacimiento = page.locator('label', { hasText: 'Fecha de nacimiento' });
    await expect(fechaNacimiento).toBeVisible({ timeout: 10000 });
    const telefono = page.locator('label', { hasText: 'Teléfono de contacto' });
    await expect(telefono).toBeVisible({ timeout: 10000 });
    const email = page.locator('label', { hasText: 'Email de contacto' });
    await expect(email).toBeVisible({ timeout: 10000 });
    const areaFalp = page.locator('label', { hasText: 'Área' });
    await expect(areaFalp).toBeVisible({ timeout: 10000 });
    const inputArea = page.locator('input#area_texto');
    await expect(inputArea).toHaveValue('Call Center');
    const selectConsulta = page.locator('#consulta');
    const options = selectConsulta.locator('option');
    await expect(options).toHaveCount(3);
    await expect(options.nth(0)).toHaveText('Solicitud de hora');
    await expect(options.nth(1)).toHaveText('Consulta general');
    await expect(options.nth(2)).toHaveText('Otro');
    const tituloMensaje = page.locator('h2', { hasText: 'Mensaje' });
    await expect(tituloMensaje).toBeVisible({ timeout: 10000 });
    const campoMensaje = page.locator('label', { hasText: 'Teléfono de contacto' });
    await expect(campoMensaje).toBeVisible({ timeout: 10000 });


});