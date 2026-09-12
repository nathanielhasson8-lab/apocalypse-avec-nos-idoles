#include <gtk/gtk.h>
#include <webkit/webkit.h>

static void activate(GtkApplication *app, gpointer user_data) {
    GtkWidget *window = gtk_application_window_new(app);
    gtk_window_set_title(GTK_WINDOW(window), "Manager 27 (edition MSN)");
    gtk_window_set_default_size(GTK_WINDOW(window), 1280, 820);

    GtkWidget *view_widget = webkit_web_view_new();
    WebKitWebView *view = WEBKIT_WEB_VIEW(view_widget);
    WebKitSettings *settings = webkit_web_view_get_settings(view);
    webkit_settings_set_enable_javascript(settings, TRUE);
    webkit_settings_set_enable_developer_extras(settings, FALSE);

    gchar *uri = g_filename_to_uri("/app/share/manager27/index.html", NULL, NULL);
    webkit_web_view_load_uri(view, uri);
    g_free(uri);

    gtk_window_set_child(GTK_WINDOW(window), view_widget);
    gtk_window_present(GTK_WINDOW(window));
}

int main(int argc, char **argv) {
    GtkApplication *app = gtk_application_new("com.manager27.MSN", G_APPLICATION_DEFAULT_FLAGS);
    g_signal_connect(app, "activate", G_CALLBACK(activate), NULL);
    int status = g_application_run(G_APPLICATION(app), argc, argv);
    g_object_unref(app);
    return status;
}
