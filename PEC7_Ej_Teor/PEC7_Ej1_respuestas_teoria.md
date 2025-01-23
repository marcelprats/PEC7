## **Ejercicio 1: Preguntas teóricas**

### **a) ¿Qué es y cómo funciona `<RouterLink>` en Angular?**
`<RouterLink>` es una directiva en Angular que se utiliza para la navegación entre rutas dentro de una aplicación de una sola página (*SPA*). En lugar de usar enlaces tradicionales con `<a href="..."`>, Angular usa `routerLink` para mejorar la eficiencia al evitar recargas de página.

Ejemplo de uso:

```html
<a [routerLink]="'/home'">Ir a Home</a>
```

Esto navega a `/home` sin recargar la página. También se puede pasar parámetros:

```html
<a [routerLink]="['/product', product.id]">Ver Producto</a>
```

### **b) Diferencia entre `routerLink` y `routerLinkActive`. ¿Qué otras directivas se pueden usar con el router en Angular?**
- **`routerLink`**: Se usa para definir la ruta a la que se quiere navegar.
- **`routerLinkActive`**: Se usa para añadir una clase CSS cuando la ruta está activa, útil para resaltar elementos en un menú de navegación.

Ejemplo:

```html
<a [routerLink]="'/dashboard'" routerLinkActive="active">Dashboard</a>
```

Si la URL es `/dashboard`, Angular añadirá la clase `active` al enlace.

Otras directivas del router en Angular:
- **`router-outlet`**: Define el punto donde se cargará el contenido dinámicamente.
- **`queryParams`**: Para pasar parámetros opcionales en la URL.
- **`fragment`**: Para manejar fragmentos en la URL (`#seccion`).

### **c) Servicio `ActivatedRouteSnapshot`. ¿Cómo se utiliza y en qué casos es útil?**
`ActivatedRouteSnapshot` es una versión inmutable de `ActivatedRoute` que proporciona el estado de la ruta en un momento específico.

Se usa cuando solo necesitamos acceder a los parámetros de la ruta una vez y no queremos suscribirnos a cambios.

Ejemplo de uso en un componente:

```typescript
import { ActivatedRouteSnapshot } from '@angular/router';

export class ProductDetailComponent {
  constructor(private route: ActivatedRouteSnapshot) {
    const productId = this.route.paramMap.get('id');
    console.log('ID del producto:', productId);
  }
}
```

Casos en los que es útil:
- Cuando queremos acceder a los parámetros de la ruta sin necesidad de suscripciones.
- Cuando necesitamos obtener información de la ruta en una **guarda de navegación**.

### **d) ¿Qué es la carga Lazy de los módulos en Angular? ¿Cómo se configura?**
Lazy Loading (carga diferida) permite cargar módulos solo cuando son necesarios, lo que mejora el rendimiento inicial de la aplicación.

Para configurar Lazy Loading:
1. **Crear un módulo separado** (por ejemplo, `ProductsModule`):
   ```bash
   ng generate module products --route products --module app.module
   ```

2. **Definir la ruta con carga Lazy en `app-routing.module.ts`**:
   ```typescript
   const routes: Routes = [
     { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }
   ];
   ```

Esto carga `ProductsModule` solo cuando el usuario accede a `/products`.

### **e) Diferencias entre `CanDeactivate` y `CanActivate` guards en Angular. Ejemplos de uso.**
Los **guards** se usan para proteger rutas en Angular.

#### **CanActivate**
Decide si el usuario puede acceder a una ruta.
Ejemplo: Restringir acceso a una página si el usuario no está autenticado.

```typescript
import { CanActivate } from '@angular/router';

export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
```

#### **CanDeactivate**
Decide si el usuario puede salir de una ruta.
Ejemplo: Evitar salir de un formulario sin guardar los cambios.

```typescript
import { CanDeactivate } from '@angular/router';

export class UnsavedChangesGuard implements CanDeactivate<any> {
  canDeactivate(component: any): boolean {
    return component.hasUnsavedChanges() ? confirm('¿Seguro que quieres salir?') : true;
  }
}
```

### **f) ¿Qué son los middlewares en el contexto de Angular? ¿Dónde estamos utilizando middlewares en nuestra aplicación?**
En Angular, los **middlewares** pueden entenderse como **interceptors HTTP**, que permiten modificar peticiones y respuestas antes de que lleguen a su destino.

Se utilizan para:
- **Añadir tokens de autenticación** en cada solicitud.
- **Registrar logs** de las peticiones HTTP.
- **Manejar errores globales**.

Ejemplo de un interceptor que agrega un token en cada petición:

```typescript
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(cloned);
  }
}
```

En nuestra aplicación, los middlewares se usarán principalmente en **interceptors HTTP** para manejar la autenticación y enviar el token en cada solicitud.

